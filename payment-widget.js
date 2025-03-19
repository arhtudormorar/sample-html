(function () {
  class PaymentWidget {
    constructor(config) {
      this.config = config;
      this.container =
        typeof config.container === "string"
          ? document.getElementById(config.container)
          : config.container;

      if (!this.container) {
        console.error("PaymentWidget Error: Container element not found!");
        return;
      }

      this.shadow = this.container.attachShadow({ mode: 'open' });
    }

    render() {

      this.shadow.innerHTML = `
                <style>
                    form {
                        font-family: Arial, sans-serif;
                        padding: 10px;
                        border: 1px solid #ccc;
                        width: 250px;
                        background: #f9f9f9;
                    }
                    label {
                        display: block;
                        margin-top: 10px;
                    }
                    input {
                        width: 100%;
                        padding: 5px;
                        margin-top: 5px;
                        border: 0;
                    }
                    button {
                        margin-top: 10px;
                        width: 100%;
                        padding: 5px;
                        background: #28a745;
                        color: white;
                        border: none;
                        cursor: pointer;
                    }
                </style>
                <form id="payment-form">
                    <label>Card Number</label>
                    <input type="text" name="card_number" required/><br/>
                    <label>Expiration Date</label>
                    <input type="text" name="exp_date" required /><br/>
                    <label>CVV</label>
                    <input type="text" name="cvv" required /><br/>
                    <button type="submit">Pay Now</button>
                </form>
            `;
      
  

        this.addSubmitHandler();

    }

    addSubmitHandler() {
      const form = this.shadow.querySelector("#payment-form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
          card_number: formData.get("card_number"),
          exp_date: formData.get("exp_date"),
          cvv: formData.get("cvv"),
          amount: this.config.amount,
          currency: this.config.currency,
          publicKey: this.config.publicKey,
        };

        // Simulate payment processing
        const response = await new Promise((resolve) => {
          alert("Processing Payment...");
          setTimeout(() => resolve("success"), 2000);
        });
        if (response === "success") {
          this.config.onSuccess(payload);
        } else {
          this.config.onError("Payment failed");
        }

        // try {
        //   const response = await fetch('https://your-api.com/checkout', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload)
        //   });
        //
        //   const result = await response.json();
        //
        //   if (result.status === 'success') {
        //     if (typeof this.config.onSuccess === 'function') {
        //       this.config.onSuccess(result);
        //     }
        //   } else {
        //     throw new Error(result.message || 'Payment failed');
        //   }
        // } catch (error) {
        //   console.error('Payment Error:', error);
        //   if (typeof this.config.onError === 'function') {
        //     this.config.onError(error);
        //   }
        // }
      });
    }
  }

  // Expose the widget globally
  window.PaymentWidget = PaymentWidget;
})();
