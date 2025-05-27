export default async function handler(req, res) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>USDC Counter</title>
      <script src="https://unpkg.com/@farcaster/frame-sdk"></script>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f5f5f5;
          padding-top: 60px;
        }
        h1 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        p {
          font-size: 26px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Farcaster Pro Subscription</h1>
      <p id="usdc">Loading...</p>

      <script>
        fetch('/api/total-usdc')
          .then(res => res.json())
          .then(data => {
            document.getElementById('usdc').textContent = data.total.toFixed(2) + ' USDC';
          });

        window.addEventListener('load', () => {
          setTimeout(() => {
            if (window.sdk?.actions?.ready) {
              window.sdk.actions.ready();
            } else {
              window.parent?.postMessage({ type: 'ready' }, '*');
            }
          }, 300); // give it a short delay to make sure data loads
        });
      </script>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
