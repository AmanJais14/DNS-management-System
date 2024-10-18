

# **DNS Server using MERN Stack**  

This project is a custom **DNS server** built with the **MERN (MongoDB, Express.js, React, Node.js) stack**, designed to resolve domain names using **A and CNAME records**. It leverages the **DNS package from npm** to handle DNS queries and provides an interactive UI to manage records.

---

## **Features**
- **A Record & CNAME Record Support**: Accurately resolves domain names to IP addresses.
- **Real-time Domain Resolution**: Uses the DNS npm package for dynamic querying.
- **Interactive Frontend**: Allows users to add, update, and delete DNS records.
- **RESTful API Integration**: Enables seamless DNS record management.
- **Scalable Design**: Mimics production-grade DNS services with focus on performance.

---

## **Tech Stack**
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **DNS Resolver**: [DNS npm package](https://www.npmjs.com/package/dns)  

---

## **Installation and Setup**

### **Prerequisites**
Make sure you have the following installed:
- Node.js (v14+)
- MongoDB  
- npm or yarn

### **Steps to Run Locally**  
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/dns-server.git
   cd dns-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start MongoDB**:
   Ensure MongoDB is running locally or provide a connection string in the environment variables.

4. **Set up environment variables**:  
   Create a `.env` file in the root directory with the following contents:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dnsDB
   ```

5. **Run the server**:
   ```bash
   npm run server
   ```

6. **Start the frontend**:
   ```bash
   cd client
   npm install
   npm start
   ```

7. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Usage**
1. **Add DNS Records**:  
   - Use the UI to create A or CNAME records by providing the domain name and IP address or alias.
  
2. **Query DNS**:  
   - Input a domain to resolve its IP using the backend API, powered by the `dns` package.

3. **Manage Records**:  
   - Edit or delete existing DNS records through the frontend.

---

## **Project Structure**
```
/dns-server
│
├── client/                 # React frontend  
├── server/                 # Express backend  
├── models/                 # MongoDB models for DNS records  
├── routes/                 # API routes  
├── .env                    # Environment variables  
├── package.json            # Dependencies  
└── README.md               # Project documentation  
```

---

## **API Endpoints**
- **GET /api/dns/:domain**: Resolve a domain to its IP address.  
- **POST /api/dns**: Add a new DNS record (A or CNAME).  
- **PUT /api/dns/:id**: Update an existing DNS record.  
- **DELETE /api/dns/:id**: Delete a DNS record.

---

## **Screenshots**
*Include relevant screenshots of your UI and API responses here.*

---

## **Future Improvements**
- Implement **TTL (Time to Live)** for DNS caching.
- Add support for **MX** and **TXT** records.
- Integrate **user authentication** for managing DNS records.

---

## **Contributing**
Feel free to open issues or submit pull requests to contribute to this project.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## **Contact**
For any queries, feel free to reach out at:  
**Aman Jaiswal** – [dev.jais.aman@gmail.com](mailto:dev.jais.aman@gmail.com)

---

Let me know if you'd like any further customization!
