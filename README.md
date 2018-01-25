# new
A quick and dirty project creation manager

Install as a global npm package and type `new PROJECT_NAME` for quick project starters.

Add more starters in `config.json`. 

Example config:

```json
{
    "starters": [{
        "name": "some-project-starter-name",
        "command": "git clone git@github.com:some/command-to-download-or-intstall-starter.git {{name}}",
        "install": [
            "npm install"
        ]
    }]
}
```

`{{name}}` is a placeholder to replace with the name of the project.