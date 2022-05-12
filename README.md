# vscode-lombok

## Overview

A lightweight extension to support [Lombok](https://projectlombok.org/) annotations processing for coc.nvim

## Requirements

- Coc.nvim (version 0.0.80 or later)

- Lombok added as a dependency in your Java Project (Make sure you're using the latest version to avoid issues!) [Add with Maven](https://projectlombok.org/setup/maven) or  [Add with Gradle](https://projectlombok.org/setup/gradle)

## Install

Install this extension by run command:

```
:CocInstall coc-lombok
```

**Note**: this extension would download latest [lombok.jar](https://projectlombok.org) for you when not found.

**Note**: You can manually download lombok.jar and extract the content to data
folder of coc-lombok, get the folder path by `:echo coc#util#extension_root().'/coc-lombox-data/server'` in your vim.


## Available commands

The following commands are available:

- `java.updateLombok`: download latest [lombok.jar](https://projectlombok.org) from [projectlombok.org](https://projectlombok.org/downloads/lombok.jar).


## Features / Supports

- [@Getter and @Setter](http://projectlombok.org/features/GetterSetter.html)
- [@ToString](http://projectlombok.org/features/ToString.html)
- [@EqualsAndHashCode](http://projectlombok.org/features/EqualsAndHashCode.html)
- [@AllArgsConstructor, @RequiredArgsConstructor and @NoArgsConstructor](http://projectlombok.org/features/Constructor.html)
- [@Log](http://projectlombok.org/features/Log.html)
- [@Slf4j](https://projectlombok.org/features/log)
- [@Data](https://projectlombok.org/features/Data.html)
- [@Builder](https://projectlombok.org/features/Builder.html)
- [@Singular](https://projectlombok.org/features/Builder.html#singular)
- [@Delegate](https://projectlombok.org/features/Delegate.html)
- [@Value](https://projectlombok.org/features/Value.html)
- [@Accessors](https://projectlombok.org/features/experimental/Accessors.html)
- [@Wither](https://projectlombok.org/features/experimental/Wither.html)
- [@SneakyThrows](https://projectlombok.org/features/SneakyThrows.html)
- [@val](https://projectlombok.org/features/val.html)
- [@UtilityClass](https://projectlombok.org/features/experimental/UtilityClass.html)

## Troubleshooting

- Run `:messages` to get echoed messages in vim.

[I'm having issues](https://github.com/hungio/coc-lombok/issues)

## License

MIT, See [LICENSE](LICENSE) for more information.

