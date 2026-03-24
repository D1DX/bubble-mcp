# Bubble MCP (D1DX Fork)

A Model Context Protocol (MCP) server that enables AI assistants to interact with Bubble.io applications through the Data API.

**Forked from [dorianglz/bubble_mcp](https://github.com/dorianglz/bubble_mcp)** (originally [nocoderoi/bubble_mcp](https://github.com/nocoderoi/bubble_mcp)).

## What We Fixed

The upstream repo has a URL path construction bug ([nocoderoi/bubble_mcp#5](https://github.com/nocoderoi/bubble_mcp/issues/5)) that causes MCP startup failures:

- **`getSchema()` and `list()`** prepended `/api/1.1/` to paths, but the base URL could also include `/api/1.1` — resulting in double-path requests (`/api/1.1/api/1.1/meta`) that return 404.
- **`get()`, `create()`, `update()`, `delete()`, `workflow()`** used relative paths like `/obj/...` without `/api/1.1/` — so they only worked when the base URL already included it.
- **`apiClient.ts`** only accepted `BUBBLE_API_URL`, not `BUBBLE_BASE_URL` (contradicting the README).

### Fixes applied

1. **`apiClient.ts`** — Accepts both `BUBBLE_API_URL` and `BUBBLE_BASE_URL`. Normalizes any input to always end with `/api/1.1`, regardless of whether the user includes it or not.
2. **`bubbleService.ts`** — All paths are now relative (`/meta`, `/obj/...`, `/wf/...`). No method prepends `/api/1.1/` since the base URL already includes it.
3. **`package.json`** — Added `prepare` script for auto-build on `npx` install. Committed `dist/` for zero-build usage.

## Features

- **Universal Bubble Support**: Works with any Bubble.io application
- **Auto-discovery**: Automatically discovers your app's data types and structure
- **CRUD Operations**: Create, Read, Update, and Delete operations for all data types
- **Workflow Execution**: Execute API workflows defined in your Bubble app
- **Privacy Settings Aware**: Respects Bubble's privacy rules and constraints
- **Read-only/Read-write Modes**: Configurable access levels for safety

## Quick Start

### With npx (no local install)

```json
{
  "mcpServers": {
    "bubble": {
      "command": "npx",
      "args": ["-y", "github:D1DX/bubble-mcp"],
      "env": {
        "BUBBLE_API_URL": "https://your-app.bubbleapps.io",
        "BUBBLE_API_TOKEN": "your-token",
        "MCP_MODE": "read-write"
      }
    }
  }
}
```

`BUBBLE_API_URL` can be either `https://your-app.bubbleapps.io` or `https://your-app.bubbleapps.io/api/1.1` — both work.

### Local install

```bash
git clone https://github.com/D1DX/bubble-mcp.git
cd bubble-mcp
npm install
npm run build
```

```json
{
  "mcpServers": {
    "bubble": {
      "command": "node",
      "args": ["/path/to/bubble-mcp/dist/mcp-server.js"],
      "env": {
        "BUBBLE_API_URL": "https://your-app.bubbleapps.io",
        "BUBBLE_API_TOKEN": "your-token",
        "MCP_MODE": "read-write"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BUBBLE_API_URL` | Yes (or `BUBBLE_BASE_URL`) | Your Bubble app URL (with or without `/api/1.1`) |
| `BUBBLE_API_TOKEN` | Yes | API token from Bubble Settings > API |
| `MCP_MODE` | No | `read-only` (default) or `read-write` |

## Available Tools

| Tool | Description | Mode |
|------|-------------|------|
| `bubble_get_schema` | Discover app data types and structure | read-only |
| `bubble_list` | List records of a data type (with pagination) | read-only |
| `bubble_get` | Get a specific record by ID | read-only |
| `bubble_create` | Create a new record | read-write |
| `bubble_update` | Update an existing record | read-write |
| `bubble_delete` | Delete a record | read-write |
| `bubble_workflow` | Execute an API workflow | read-write |

## Getting Your Bubble API Token

1. Go to your Bubble app editor
2. Navigate to Settings > API
3. Enable "This app exposes a Data API"
4. Generate an API token

## License

MIT — see [LICENSE](LICENSE).

## Credits

Original project by [nocoderoi](https://github.com/nocoderoi/bubble_mcp) and [dorianglz](https://github.com/dorianglz/bubble_mcp). Fork maintained by [D1DX](https://github.com/D1DX).
