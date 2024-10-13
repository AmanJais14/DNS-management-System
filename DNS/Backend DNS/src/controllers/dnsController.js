const DNSRecord = require('../models/DNSRecord');
const dns = require('dns');
const { promisify } = require('util');

const resolveDns = promisify(dns.resolve);
const resolveCname = promisify(dns.resolveCname);

async function resolveToIp(domain) {
  try {
    const addresses = await resolveDns(domain);
    return addresses[0]; // Return the first IP address
  } catch (error) {
    console.error(`Error resolving ${domain}: ${error}`);
    return null;
  }
}

async function resolveCNAME(domain, depth = 0) {
  if (depth > 10) { // Prevent infinite loops
    throw new Error('Max CNAME resolution depth exceeded');
  }

  try {
    const cnames = await resolveCname(domain);
    if (cnames && cnames.length > 0) {
      console.log(`CNAME for ${domain}: ${cnames[0]}, depth: ${depth}`);
      return resolveCNAME(cnames[0], depth + 1);
    } else {
      // If no more CNAMEs, try to resolve as an A record
      return resolveToIp(domain);
    }
  } catch (error) {
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      // If it's not a CNAME, try to resolve it as an A record
      return resolveToIp(domain);
    } else {
      console.error(`Error resolving CNAME for ${domain}: ${error}`);
      return null;
    }
  }
}

exports.getAllRecords = async (req, res) => {
  try {
    const records = await DNSRecord.find();
    const resolvedRecords = await Promise.all(records.map(async (record) => {
      let ipAddress = null;
      if (record.recordType === 'A') {
        ipAddress = await resolveToIp(record.domain);
      } else if (record.recordType === 'CNAME') {
        ipAddress = await resolveCNAME(record.value);
      }
      return { ...record.toObject(), resolvedIp: ipAddress };
    }));
    res.json(resolvedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const record = await DNSRecord.findOne({ domain: req.params.domain });
    if (record == null) {
      return res.status(404).json({ message: 'Record not found' });
    }
    let ipAddress = null;
    if (record.recordType === 'A') {
      ipAddress = await resolveToIp(record.domain);
    } else if (record.recordType === 'CNAME') {
      ipAddress = await resolveCNAME(record.value);
    }
    res.json({ ...record.toObject(), resolvedIp: ipAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const record = await DNSRecord.findOne({ domain: req.params.domain });
    if (record == null) {
      return res.status(404).json({ message: 'Record not found' });
    }
    let ipAddress = null;
    if (record.recordType === 'A') {
      ipAddress = await resolveToIp(record.domain);
    } else if (record.recordType === 'CNAME') {
      ipAddress = await resolveCNAME(record.value);
    }
    res.json({ ...record.toObject(), resolvedIp: ipAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRecord = async (req, res) => {
    const record = new DNSRecord({
      domain: req.body.domain,
      recordType: req.body.recordType,
      value: req.body.value,
      ttl: req.body.ttl
    });
  
    try {
      const newRecord = await record.save();
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updateRecord = async (req, res) => {
    try {
      const record = await DNSRecord.findOneAndUpdate(
        { domain: req.params.domain },
        req.body,
        { new: true }
      );
      res.json(record);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.deleteRecord = async (req, res) => {
    try {
      await DNSRecord.findOneAndDelete({ domain: req.params.domain });
      res.json({ message: 'Record deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };