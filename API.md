# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RocketleapCdkProject <a name="RocketleapCdkProject" id="@rocketleap/rocketleap-projen.RocketleapCdkProject"></a>

A projen project for Rocketleap CDK projects.

This project type generates a fully configured AWS CDK TypeScript application
with Rocketleap's standard configuration including ESLint, Prettier, Yarn Berry,
and pre-commit hooks.

#### Initializers <a name="Initializers" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.Initializer"></a>

```typescript
import { RocketleapCdkProject } from '@rocketleap/rocketleap-projen'

new RocketleapCdkProject(props: RocketleapCdkProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.Initializer.parameter.props">props</a></code> | <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions">RocketleapCdkProjectOptions</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.Initializer.parameter.props"></a>

- *Type:* <a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions">RocketleapCdkProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addCompileCommand">addCompileCommand</a></code> | DEPRECATED. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addTestCommand">addTestCommand</a></code> | DEPRECATED. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.hasScript">hasScript</a></code> | Indicates if a script by the name name is defined. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.addCdkDependency">addCdkDependency</a></code> | Adds an AWS CDK module dependencies. |

---

##### `toString` <a name="toString" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `npx projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addCompileCommand`~~ <a name="addCompileCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addCompileCommand"></a>

```typescript
public addCompileCommand(commands: ...string[]): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addCompileCommand.parameter.commands"></a>

- *Type:* ...string[]

---

##### `addDeps` <a name="addDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### ~~`addTestCommand`~~ <a name="addTestCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTestCommand"></a>

```typescript
public addTestCommand(commands: ...string[]): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addTestCommand.parameter.commands"></a>

- *Type:* ...string[]

---

##### ~~`hasScript`~~ <a name="hasScript" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.hasScript"></a>

```typescript
public hasScript(name: string): boolean
```

Indicates if a script by the name name is defined.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.hasScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `removeScript` <a name="removeScript" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

##### `addCdkDependency` <a name="addCdkDependency" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addCdkDependency"></a>

```typescript
public addCdkDependency(modules: ...string[]): void
```

Adds an AWS CDK module dependencies.

###### `modules`<sup>Required</sup> <a name="modules" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.addCdkDependency.parameter.modules"></a>

- *Type:* ...string[]

The list of modules to depend on.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.isConstruct"></a>

```typescript
import { RocketleapCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapCdkProject.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.isProject"></a>

```typescript
import { RocketleapCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapCdkProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.of"></a>

```typescript
import { RocketleapCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapCdkProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.entrypoint">entrypoint</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.manifest">manifest</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The package manager to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.publisher">publisher</a></code> | <code>projen.release.Publisher</code> | Package publisher. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.appEntrypoint">appEntrypoint</a></code> | <code>string</code> | The CDK app entrypoint. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkConfig">cdkConfig</a></code> | <code>projen.awscdk.CdkConfig</code> | cdk.json configuration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkDeps">cdkDeps</a></code> | <code>projen.awscdk.AwsCdkDeps</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkTasks">cdkTasks</a></code> | <code>projen.awscdk.CdkTasks</code> | Common CDK tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkVersion">cdkVersion</a></code> | <code>string</code> | The CDK version this app is using. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.company">company</a></code> | <code>string</code> | The company identifier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projectName">projectName</a></code> | <code>string</code> | The project name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `projectType`<sup>Required</sup> <a name="projectType" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projectType"></a>

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### ~~`allowLibraryDependencies`~~<sup>Required</sup> <a name="allowLibraryDependencies" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.allowLibraryDependencies"></a>

- *Deprecated:* use `package.allowLibraryDependencies`

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### ~~`entrypoint`~~<sup>Required</sup> <a name="entrypoint" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.entrypoint"></a>

- *Deprecated:* use `package.entrypoint`

```typescript
public readonly entrypoint: string;
```

- *Type:* string

---

##### ~~`manifest`~~<sup>Required</sup> <a name="manifest" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.manifest"></a>

- *Deprecated:* use `package.addField(x, y)`

```typescript
public readonly manifest: any;
```

- *Type:* any

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### ~~`packageManager`~~<sup>Required</sup> <a name="packageManager" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.packageManager"></a>

- *Deprecated:* use `package.packageManager`

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager

The package manager to use.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.biome"></a>

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### ~~`publisher`~~<sup>Optional</sup> <a name="publisher" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.publisher"></a>

- *Deprecated:* use `release.publisher`.

```typescript
public readonly publisher: Publisher;
```

- *Type:* projen.release.Publisher

Package publisher.

This will be `undefined` if the project does not have a
release workflow.

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### `docsDirectory`<sup>Required</sup> <a name="docsDirectory" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### `libdir`<sup>Required</sup> <a name="libdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### `srcdir`<sup>Required</sup> <a name="srcdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### `tsconfigDev`<sup>Required</sup> <a name="tsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### `watchTask`<sup>Required</sup> <a name="watchTask" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.watchTask"></a>

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.eslint"></a>

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `tsconfigEslint`<sup>Optional</sup> <a name="tsconfigEslint" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.tsconfigEslint"></a>

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `appEntrypoint`<sup>Required</sup> <a name="appEntrypoint" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.appEntrypoint"></a>

```typescript
public readonly appEntrypoint: string;
```

- *Type:* string

The CDK app entrypoint.

---

##### `cdkConfig`<sup>Required</sup> <a name="cdkConfig" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkConfig"></a>

```typescript
public readonly cdkConfig: CdkConfig;
```

- *Type:* projen.awscdk.CdkConfig

cdk.json configuration.

---

##### `cdkDeps`<sup>Required</sup> <a name="cdkDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkDeps"></a>

```typescript
public readonly cdkDeps: AwsCdkDeps;
```

- *Type:* projen.awscdk.AwsCdkDeps

---

##### `cdkTasks`<sup>Required</sup> <a name="cdkTasks" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkTasks"></a>

```typescript
public readonly cdkTasks: CdkTasks;
```

- *Type:* projen.awscdk.CdkTasks

Common CDK tasks.

---

##### `cdkVersion`<sup>Required</sup> <a name="cdkVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.cdkVersion"></a>

```typescript
public readonly cdkVersion: string;
```

- *Type:* string

The CDK version this app is using.

---

##### `company`<sup>Required</sup> <a name="company" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.company"></a>

```typescript
public readonly company: string;
```

- *Type:* string

The company identifier.

---

##### `projectName`<sup>Required</sup> <a name="projectName" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.projectName"></a>

```typescript
public readonly projectName: string;
```

- *Type:* string

The project name.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### `DEFAULT_TS_JEST_TRANFORM_PATTERN`<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@rocketleap/rocketleap-projen.RocketleapCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

## Structs <a name="Structs" id="Structs"></a>

### RocketleapCdkProjectOptions <a name="RocketleapCdkProjectOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions"></a>

Options for RocketleapCdkProject.

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.Initializer"></a>

```typescript
import { RocketleapCdkProjectOptions } from '@rocketleap/rocketleap-projen'

const rocketleapCdkProjectOptions: RocketleapCdkProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.company">company</a></code> | <code>string</code> | The company identifier used for package scoping. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.project">project</a></code> | <code>string</code> | The project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildingBlocksVersion">buildingBlocksVersion</a></code> | <code>string</code> | The Rocketleap building blocks CDK version to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkVersion">cdkVersion</a></code> | <code>string</code> | The AWS CDK version to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.constructVersion">constructVersion</a></code> | <code>string</code> | The constructs library version to use. |

---

##### `company`<sup>Required</sup> <a name="company" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.company"></a>

```typescript
public readonly company: string;
```

- *Type:* string

The company identifier used for package scoping.

---

*Example*

```typescript
'rocketleap'
```


##### `project`<sup>Required</sup> <a name="project" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

The project name.

---

*Example*

```typescript
'root-cdk'
```


##### `buildingBlocksVersion`<sup>Optional</sup> <a name="buildingBlocksVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildingBlocksVersion"></a>

```typescript
public readonly buildingBlocksVersion: string;
```

- *Type:* string
- *Default:* '0.105.0-RC1'

The Rocketleap building blocks CDK version to use.

---

##### `cdkVersion`<sup>Optional</sup> <a name="cdkVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkVersion"></a>

```typescript
public readonly cdkVersion: string;
```

- *Type:* string
- *Default:* '2.233.0'

The AWS CDK version to use.

---

##### `constructVersion`<sup>Optional</sup> <a name="constructVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.constructVersion"></a>

```typescript
public readonly constructVersion: string;
```

- *Type:* string
- *Default:* '10.4.4'

The constructs library version to use.

---



