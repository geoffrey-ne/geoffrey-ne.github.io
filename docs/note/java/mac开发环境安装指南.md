# mac 开发环境安装指南

## 安装 Homebrew

mac 一般会自带，已安装的话可以忽略。

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## JDK（openjdk-11）

Adopt OpenJDK 11.0.3：http://soft.corp.kuaishou.com/ios/OpenJDK11U-jdk_x64_mac_hotspot_11.0.3_7.pkg(opens new window)

终端写入环境变量

```shell
export JAVA_HOME=$(/usr/libexec/java_home)
echo $JAVA_HOME
test -r ~/.bash_profile && echo "export JAVA_HOME=$JAVA_HOME" >>~/.bash_profile
test -r ~/.profile && echo "export JAVA_HOME=$JAVA_HOME" >>~/.profile
test -r ~/.zshrc && echo "export JAVA_HOME=$JAVA_HOME" >>~/.zshrc
```

## 安装 Maven

```shell
brew install maven
```

由于某些项目体量很大，需要解析大量的依赖，为了防止 Maven 内存不足问题的出现，可以通过以下命令增加环境变量配置：

```shell
test -r ~/.bash_profile && echo 'export MAVEN_OPTS="$MAVEN_OPTS -Xmx4g"' >>~/.bash_profile
test -r ~/.profile && echo 'export MAVEN_OPTS="$MAVEN_OPTS -Xmx4g"' >>~/.profile
test -r ~/.zshrc && echo 'export MAVEN_OPTS="$MAVEN_OPTS -Xmx4g"' >>~/.zshrc
```

配置 maven

```shell
# 确保.m2文件夹已创建
mkdir -p ~/.m2/

# 检查是否存在之前的 settings.xml 文件，有的话先备份它，好习惯要养成
test -r ~/.m2/settings.xml && cp ~/.m2/settings.xml ~/.m2/settings.xml.$(date '+%Y%m%d').bak

# 打开自己存放代码的目录，如 ~/Develop，将 kuaishou-build-tools 工程 clone 到本地，若本地已经存在则省略这步
cd ~/Develop # !!这里替换成你自己的存放代码的目录!!
git clone --depth=1 git@git.corp.kuaishou.com:ks/kuaishou-build-tools.git

# 进入 kuaishou-build-tools 代码目录，并将其更新到最新版
cd kuaishou-build-tools
git pull --rebase

# 建立软链
# 注意！这里的路径必须要用绝对路径！因为即使路径不存在也可以成功的创建软链！感谢 @孙式松 同学的实践经验！
# 一定！一定！一定！要进入 kuaishou-build-tools 目录再执行下面的命令！99.9% 的异常都是软链创建错了！！！
ln -fsv $(pwd)/src/main/resources/settings.xml ~/.m2/settings.xml

# 确认软链建立是否正确
ll ~/.m2
```

## IDE

command + shift + A：快捷搜索

- IntelliJ IDEA：https://www.jetbrains.com/idea/
- 安装无限试用插件：https://github.com/RisesunStudios/ide-eval-resetter

### IDE 配置

#### 代码签名配置

Editor | File and Code Templates | Includes | File Header （快捷搜索词：file header），设置默认的 Java 代码签名

```java
/**
 * @author yourname <yourname@kuaishou.com>
 * Created on ${YEAR}-${MONTH}-${DAY}
 */
```

#### IDEA JVM 内存配置

因为我们的代码库比较大，需要大内存，否则就会很卡。

修改 IDEA 启动的 JVM 配置，菜单 Help | Edit Custom VM Options...，会打开文件 idea.vmoptions。替换其中的一些内存配置参数。（每次大版本升级需要重新确认一下）

（新版本 idea.vmoptions 位置参见这里 https://www.jetbrains.com/help/idea/tuning-intellij-idea.html ）

```shell
-Xms1g
-Xmx4g
-XX:ReservedCodeCacheSize=1g
```

#### maven

command + shift + a: 搜索 maven

- 勾选“Always update snapshots”
- Maven -> importing -> VM options for importer -> -Xmx5000m

#### 编译堆内存

command + shift + a: 搜索 compiler

- Shared build process heap size -> 2000

#### Java8 parameters 设置 (Required)

command + shift + a: 搜索 javac

- Additional command line parameters: -parameters

#### optimize import 配置（Required）

删除代码的时候，会导致一些无用的 import，一般的方式是手动将 idea 中无用的 import 行挨个删掉，我们希望可以一次性将无用 import 删除，处理 import 顺序等，防止 checkstyle 不过。

- Preferences > Tools > Actions on Save -> Optimize imports

#### properties 文件转义配置

勾选 Preferences | Editor | File encodings 下的 transparent native-to-ascii conversion
