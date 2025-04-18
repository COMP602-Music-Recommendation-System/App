<h1>Projet setup</h1>
<details>
<summary><span>Install</span></summary>
Windows:

```bash
winget install --id=OpenJS.NodeJS -v "22.10.0" -e
powershell -c "irm bun.sh/install.ps1|iex"
```

Mac:

```bash
brew install node@22 oven-sh/bun/bun
```

if `brew` not found install with command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install angular cli

```bash
bun add -g @angular/cli
```

</details>

open projet in terminal run `bun i` and copy [environment.prod.ts](src/environments/environment.prod.ts) as [environment.ts](src/environments/environment.ts) and change value `domain` to your test server domain ex: http://localhost:8000
