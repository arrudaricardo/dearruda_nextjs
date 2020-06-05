---
title: WSL2 launch VSCODE (quick tip)
description: Simple tip for WSL 
author: "Ricardo de Arruda"
date: 2020-06-05
draft: false 
tags: [Vscode, WSL, beginner, tips]
---

If you are using WSL2 and want to launch the vscode from your Windows bin from WSL linux terminal, you can use this simple gist:
```bash
#!/usr/bin/env bash

# vscode launch windows
username="Your Windows User Name"
bin_path="/mnt/c/Users/$username/AppData/Local/Programs/Microsoft\ VS\ Code/bin/code"

if [ $# -eq 0   ]; then
  eval "$bin_path -add $(pwd)"
  else
    eval "$bin_path -add $1"
    fi
```
If you don't want to hard-code your username:
```bash
username=$(/mnt/c/Windows/System32/cmd.exe /c 'echo %username%' |& tail -1)
```
And now you can user the command **code** to open the folder or **code filename** to open file, as the vscode CLI.

Be also sure to have [Remote-WSl extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) installed.

Now save at **/usr/local/bin/** or anywhere in your PATH for global access.

