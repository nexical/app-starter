# Nexical App Starter

Welcome to the Nexical App Starter project.

## Development Workflow

### Syncing Updates with Submodules

This project uses Git submodules. To ensure your local repository stays in sync with the upstream changes, follow these guidelines:

1.  **Pull the latest changes with submodule recursion**
    
    This command fetches the latest changes for the main project AND automatically updates all submodules to the commits expected by the main project.
    
    ```bash
    git pull --recurse-submodules
    ```

    > **Note**: If you see errors about "local changes", it means you have uncommitted work in a submodule. You must go into that submodule and stash or commit your changes first.

2.  **Force-sync submodules (Backup Step)**
    
    If `git pull` was already run without the flag, or if submodules seem out of sync (showing as "modified" in `git status` when you haven't touched them), run this to force them to match the main project:
    
    ```bash
    git submodule update --init --recursive
    ```

3.  **Optional: Configure Git to always do this**
    
    To avoid forgetting the flag, you can set this configuration globally or per-project:
    
    ```bash
    # For this project only
    git config submodule.recurse true
    
    # Or globally for your user
    # git config --global submodule.recurse true
    ```
