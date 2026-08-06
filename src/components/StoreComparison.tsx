export default function StoreComparison() {
    return (
      <section
        style={{
          padding: "80px",
          background: "#fafafa",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Compare Stores
        </h2>
  
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "50px",
          }}
        >
          Compare prices from Hornbach, Gamma, Praxis, Karwei and more.
        </p>
  
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ background: "#ff6b35", color: "white" }}>
              <th style={{ padding: 20 }}>Store</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Delivery</th>
              <th>Rating</th>
            </tr>
          </thead>
  
          <tbody>
            <tr>
              <td style={{ padding: 20 }}>Hornbach</td>
              <td>€11.95</td>
              <td>✔</td>
              <td>Tomorrow</td>
              <td>4.8</td>
            </tr>
  
            <tr>
              <td style={{ padding: 20 }}>Gamma</td>
              <td>€12.30</td>
              <td>✔</td>
              <td>2 Days</td>
              <td>4.6</td>
            </tr>
  
            <tr>
              <td style={{ padding: 20 }}>Praxis</td>
              <td>€13.15</td>
              <td>Low</td>
              <td>Tomorrow</td>
              <td>4.7</td>
            </tr>
  
            <tr>
              <td style={{ padding: 20 }}>Karwei</td>
              <td>€12.60</td>
              <td>✔</td>
              <td>3 Days</td>
              <td>4.5</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }