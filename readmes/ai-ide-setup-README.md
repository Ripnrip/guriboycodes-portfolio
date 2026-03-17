# <p align="center">🤖</p>
<h1 align="center">AI IDE Setup</h1>

<p align="center">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
    <img src="https://img.shields.io/badge/tech-Bash-lightgrey.svg" alt="Tech: Bash">
    <img src="https://img.shields.io/badge/tech-MCP%20Servers-orange" alt="Tech: MCP Servers">
    <img src="https://img.shields.io/badge/tech-AI%20Tooling-brightgreen.svg" alt="Tech: AI Tooling">
    <img src="https://img.shields.io/badge/tech-Cursor-blue.svg" alt="Tech: Cursor">
    <img src="https://img.shields.io/badge/tech-Claude-red.svg" alt="Tech: Claude">
    <img src="https://img.shields.io/badge/tech-GitHub%20Copilot-purple.svg" alt="Tech: GitHub Copilot">
</p>

## Overview

This repository provides a comprehensive collection of dotfiles, scripts, and Model Context Protocol (MCP) server configurations designed to create a powerful and efficient development environment for pair programming with AI assistants. The configurations are optimized for seamless integration with leading AI tools, enabling developers to maximize their productivity and streamline their workflows.

> This project is engineered to provide a world-class, AI-augmented coding experience, drawing inspiration from best practices at top-tier technology companies. It aims to serve as a foundational toolkit for any developer looking to harness the full potential of AI in their daily coding tasks.

## Key Features

*   **Unified Configuration:** A cohesive set of configurations for various tools, ensuring a consistent and predictable development experience across different platforms and editors.
*   **AI Assistant Integration:** Pre-configured settings for popular AI assistants including Claude, Cursor, and GitHub Copilot, allowing for immediate out-of-the-box productivity.
*   **Custom MCP Servers:** Includes custom MCP server setups that allow for extending the capabilities of your AI tools and integrating them with other services and APIs.
*   **Productivity Scripts:** A collection of Bash scripts to automate common development tasks, from project setup to deployment, all enhanced with AI capabilities.

## Architecture/How It Works

The architecture of this setup is modular, allowing developers to pick and choose the components that best fit their needs. The core of the system is a set of well-documented dotfiles that configure the shell environment, code editors, and other development tools. These configurations are designed to work in concert with the provided MCP servers, which act as a bridge between the local development environment and external AI services. This decoupled architecture ensures that the system is both flexible and extensible, allowing for the easy addition of new tools and services.

## Tech Stack

The following table outlines the key technologies and tools that form the foundation of this AI-powered IDE setup.

| Category          | Technology/Tool      |
| ----------------- | -------------------- |
| **Scripting**     | Bash                 |
| **AI Integration**| MCP Servers          |
| **AI Tooling**    | AI Tooling           |
| **Editors**       | Cursor               |
| **AI Assistants** | Claude, GitHub Copilot |

## Getting Started

To get started with this AI IDE setup, you will need to clone the repository and run the installation script. The script will back up your existing dotfiles and create symbolic links to the new configurations.

```bash
git clone https://github.com/Ripnrip/ai-ide-setup.git
cd ai-ide-setup
./install.sh
```

> Please make sure to review the `install.sh` script before running it to understand the changes it will make to your system.

## Demo/Screenshots

*(Placeholder for a GIF or screenshots demonstrating the AI-assisted workflow in action.)*

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, please open an issue or submit a pull request. Please follow the existing code style and add tests for any new or changed functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center"><em>Built by <a href="https://github.com/Ripnrip">@GuriboyCodes</a></em></p>
<p align="center"><a href="https://guriboycodes.com">Portfolio</a> | <a href="https://github.com/Ripnrip">GitHub</a></p>

## Configuration

This setup is designed to be highly customizable. You can tailor the configurations to your specific needs by editing the dotfiles in the `config` directory. Each file is commented to explain the purpose of each setting.

### Adding New AI Tools

To add a new AI tool, you will need to create a new configuration file in the `config` directory and update the `install.sh` script to create a symbolic link to it. You may also need to create a new MCP server to integrate the tool with your workflow.

### Customizing MCP Servers

The MCP servers are located in the `mcp-servers` directory. You can customize the existing servers or add new ones to extend the capabilities of your AI tools. Each server is a self-contained application that can be run independently.

## Troubleshooting

If you encounter any issues during the installation or use of this setup, please check the following:

*   **Check for conflicting configurations:** Make sure that you have backed up and removed any existing dotfiles that may conflict with this setup.
*   **Check the logs:** The `install.sh` script creates a log file that can be used to debug any installation issues. The MCP servers also have their own log files that can be used to debug any runtime issues.
*   **Open an issue:** If you are still unable to resolve the issue, please open an issue on the GitHub repository.

## Future Work

*   **Add support for more AI tools:** We plan to add support for more AI tools in the future, including those for code generation, testing, and debugging.
*   **Improve the MCP server framework:** We plan to improve the MCP server framework to make it easier to create and customize MCP servers.
*   **Create a user-friendly interface:** We plan to create a user-friendly interface for managing the configurations and MCP servers.


## Community and Support

Join our community to get help, share your configurations, and contribute to the project. We have a Discord server where you can chat with other users and the developers.

*   **Discord:** [Join our Discord server](https://discord.gg/your-discord-link)
*   **GitHub Discussions:** [Ask questions and share your ideas](https://github.com/Ripnrip/ai-ide-setup/discussions)

## Acknowledgements

This project would not be possible without the amazing work of the open-source community. We would like to thank the developers of the following tools and libraries for their contributions:

*   [Cursor](https://cursor.sh/)
*   [Claude](https://www.anthropic.com/claude)
*   [GitHub Copilot](https://copilot.github.com/)
*   [shields.io](https://shields.io/)

## Author

This project is maintained by Gurinder Singh, a Staff Software Engineer with a passion for building tools that empower developers. You can find more of his work on his GitHub profile and portfolio.

*   **GitHub:** [@Ripnrip](https://github.com/Ripnrip)
*   **Portfolio:** [guriboycodes.com](https://guriboycodes.com)
*   **LinkedIn:** [Gurinder Singh](https://www.linkedin.com/in/gurinder-singh-b9399a12a/)

