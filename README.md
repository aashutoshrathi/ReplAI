<p align="center">
    <img width="100" src="https://raw.githubusercontent.com/aashutoshrathi/ReplAI/main/assets/icon-128.png?token=AFBXTASWGQMOH7DPQCFUZA3BN7RX4">
</p>

<h1 align="center">ReplAI</h1>

<div align="center">
    An Outlook Plugin which helps you reply.
</div>

## Dev

- Create `.env` file by copying `.env.sample`.

- To Start Debugger use:

```bash
npm start
```

- To Stop Debugger use:

```bash
npm stop
```

## Deploy

- Change `urlProd` in `webpack.config.js` to the path.
- Do a `npm run build` & host the `dist` as file server.
- Import the `manifest.prod.xml` on Admin Page of MS Suite.
