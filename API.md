# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RocketleapLibraryCdkProject <a name="RocketleapLibraryCdkProject" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject"></a>

Projen project for Rocketleap CDK construct library projects.

This is for CDK construct libraries (e.g., building-blocks-cdk).
Includes CDK peer dependencies and publishing configuration for GitHub Packages.

#### Initializers <a name="Initializers" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.Initializer"></a>

```typescript
import { RocketleapLibraryCdkProject } from '@rocketleap/rocketleap-projen'

new RocketleapLibraryCdkProject(options: RocketleapLibraryCdkProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.Initializer.parameter.options">options</a></code> | <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions">RocketleapLibraryCdkProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions">RocketleapLibraryCdkProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |

---

##### `toString` <a name="toString" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `pnpm projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "projectCreation()" for all components, only if the project is being created for the first time
6. Call "postSynthesize()" for all components of this project
7. Call "this.postSynthesize()"
8. Call "postProjectCreation()" for all components, only if the project is being created for the first time

##### `tryFindFile` <a name="tryFindFile" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDeps` <a name="addDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### `removeScript` <a name="removeScript" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.isConstruct"></a>

```typescript
import { RocketleapLibraryCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapLibraryCdkProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.isProject"></a>

```typescript
import { RocketleapLibraryCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapLibraryCdkProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.of"></a>

```typescript
import { RocketleapLibraryCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapLibraryCdkProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.runner">runner</a></code> | <code>projen.typescript.TypeScriptRunner</code> | The TypeScript runner used for executing TypeScript files. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### ~~`initProject`~~<sup>Optional</sup> <a name="initProject" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.initProject"></a>

- *Deprecated:* use the `initProject` argument passed to `Component.projectCreation()` instead.

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.biome"></a>

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### `docsDirectory`<sup>Required</sup> <a name="docsDirectory" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### `libdir`<sup>Required</sup> <a name="libdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### `runner`<sup>Required</sup> <a name="runner" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.runner"></a>

```typescript
public readonly runner: TypeScriptRunner;
```

- *Type:* projen.typescript.TypeScriptRunner

The TypeScript runner used for executing TypeScript files.

---

##### `srcdir`<sup>Required</sup> <a name="srcdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### `tsconfigDev`<sup>Required</sup> <a name="tsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### `watchTask`<sup>Required</sup> <a name="watchTask" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.watchTask"></a>

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.eslint"></a>

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `tsconfigEslint`<sup>Optional</sup> <a name="tsconfigEslint" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.tsconfigEslint"></a>

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### `DEFAULT_TS_JEST_TRANFORM_PATTERN`<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

### RocketleapPlatformCdkProject <a name="RocketleapPlatformCdkProject" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject"></a>

Projen project for Rocketleap Platform CDK projects.

This is for platform infrastructure code (e.g., root-cdk, vpc-cdk, iam-cdk).
Includes the Norberhuis Onderneming B.V. license.

#### Initializers <a name="Initializers" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.Initializer"></a>

```typescript
import { RocketleapPlatformCdkProject } from '@rocketleap/rocketleap-projen'

new RocketleapPlatformCdkProject(options: RocketleapCdkProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.Initializer.parameter.options">options</a></code> | <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions">RocketleapCdkProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions">RocketleapCdkProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |

---

##### `toString` <a name="toString" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `pnpm projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "projectCreation()" for all components, only if the project is being created for the first time
6. Call "postSynthesize()" for all components of this project
7. Call "this.postSynthesize()"
8. Call "postProjectCreation()" for all components, only if the project is being created for the first time

##### `tryFindFile` <a name="tryFindFile" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDeps` <a name="addDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### `removeScript` <a name="removeScript" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.isConstruct"></a>

```typescript
import { RocketleapPlatformCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapPlatformCdkProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.isProject"></a>

```typescript
import { RocketleapPlatformCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapPlatformCdkProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.of"></a>

```typescript
import { RocketleapPlatformCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapPlatformCdkProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.runner">runner</a></code> | <code>projen.typescript.TypeScriptRunner</code> | The TypeScript runner used for executing TypeScript files. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.appEntrypoint">appEntrypoint</a></code> | <code>string</code> | The CDK app entrypoint. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkConfig">cdkConfig</a></code> | <code>projen.awscdk.CdkConfig</code> | cdk.json configuration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkDeps">cdkDeps</a></code> | <code>projen.awscdk.AwsCdkDeps</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkTasks">cdkTasks</a></code> | <code>projen.awscdk.CdkTasks</code> | Common CDK tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkVersion">cdkVersion</a></code> | <code>string</code> | The CDK version this app is using. |

---

##### `node`<sup>Required</sup> <a name="node" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### ~~`initProject`~~<sup>Optional</sup> <a name="initProject" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.initProject"></a>

- *Deprecated:* use the `initProject` argument passed to `Component.projectCreation()` instead.

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.biome"></a>

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### `docsDirectory`<sup>Required</sup> <a name="docsDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### `libdir`<sup>Required</sup> <a name="libdir" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### `runner`<sup>Required</sup> <a name="runner" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.runner"></a>

```typescript
public readonly runner: TypeScriptRunner;
```

- *Type:* projen.typescript.TypeScriptRunner

The TypeScript runner used for executing TypeScript files.

---

##### `srcdir`<sup>Required</sup> <a name="srcdir" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### `tsconfigDev`<sup>Required</sup> <a name="tsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### `watchTask`<sup>Required</sup> <a name="watchTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.watchTask"></a>

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.eslint"></a>

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `tsconfigEslint`<sup>Optional</sup> <a name="tsconfigEslint" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.tsconfigEslint"></a>

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `appEntrypoint`<sup>Required</sup> <a name="appEntrypoint" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.appEntrypoint"></a>

```typescript
public readonly appEntrypoint: string;
```

- *Type:* string

The CDK app entrypoint.

---

##### `cdkConfig`<sup>Required</sup> <a name="cdkConfig" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkConfig"></a>

```typescript
public readonly cdkConfig: CdkConfig;
```

- *Type:* projen.awscdk.CdkConfig

cdk.json configuration.

---

##### `cdkDeps`<sup>Required</sup> <a name="cdkDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkDeps"></a>

```typescript
public readonly cdkDeps: AwsCdkDeps;
```

- *Type:* projen.awscdk.AwsCdkDeps

---

##### `cdkTasks`<sup>Required</sup> <a name="cdkTasks" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkTasks"></a>

```typescript
public readonly cdkTasks: CdkTasks;
```

- *Type:* projen.awscdk.CdkTasks

Common CDK tasks.

---

##### `cdkVersion`<sup>Required</sup> <a name="cdkVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.cdkVersion"></a>

```typescript
public readonly cdkVersion: string;
```

- *Type:* string

The CDK version this app is using.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### `DEFAULT_TS_JEST_TRANFORM_PATTERN`<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@rocketleap/rocketleap-projen.RocketleapPlatformCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

### RocketleapPlatformMinimalProject <a name="RocketleapPlatformMinimalProject" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject"></a>

A minimal projen base for rocketleap repos that are NOT CDK projects.

Use this for repos whose source is essentially hand-maintained (docs,
sample monorepos, template directories, …) but still need to participate
in the platform's release flow (version-bump, release, tag-release
workflows; dependabot config; the customer release CLI).

Carries the bare minimum projen wires the release workflows expect:

 - A real npm-style `package.json` with a `version` field — the
   version-bump workflow reads/writes it.
 - A `main` default release branch.
 - Yarn 4 (Berry) configured against the rocketleap registry.
 - The rocketleap git defaults (line endings, attributes).
 - The rocketleap prettier defaults.
 - A `.projenrc.ts` (TypeScript projenrc) backed by a minimal
   `tsconfig.projen.json` for compilation — does not promote the
   whole project to TypeScript.
 - GitHub Mergify and the projen-default workflows disabled — the
   rocketleap workflows live in the internal subclass.

Deliberately does NOT bring CDK config, ESLint, SWC, jest, project-wide
TypeScript compilation, or sample `src/` / `test/` scaffolding. Repos
that need those should use one of the CDK project types instead.

#### Initializers <a name="Initializers" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.Initializer"></a>

```typescript
import { RocketleapPlatformMinimalProject } from '@rocketleap/rocketleap-projen'

new RocketleapPlatformMinimalProject(options: RocketleapPlatformMinimalProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.Initializer.parameter.options">options</a></code> | <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions">RocketleapPlatformMinimalProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions">RocketleapPlatformMinimalProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |

---

##### `toString` <a name="toString" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `pnpm projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "projectCreation()" for all components, only if the project is being created for the first time
6. Call "postSynthesize()" for all components of this project
7. Call "this.postSynthesize()"
8. Call "postProjectCreation()" for all components, only if the project is being created for the first time

##### `tryFindFile` <a name="tryFindFile" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDeps` <a name="addDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### `removeScript` <a name="removeScript" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.isConstruct"></a>

```typescript
import { RocketleapPlatformMinimalProject } from '@rocketleap/rocketleap-projen'

RocketleapPlatformMinimalProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.isProject"></a>

```typescript
import { RocketleapPlatformMinimalProject } from '@rocketleap/rocketleap-projen'

RocketleapPlatformMinimalProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.of"></a>

```typescript
import { RocketleapPlatformMinimalProject } from '@rocketleap/rocketleap-projen'

RocketleapPlatformMinimalProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |

---

##### `node`<sup>Required</sup> <a name="node" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### ~~`initProject`~~<sup>Optional</sup> <a name="initProject" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.initProject"></a>

- *Deprecated:* use the `initProject` argument passed to `Component.projectCreation()` instead.

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.biome"></a>

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

### RocketleapWorkloadCdkProject <a name="RocketleapWorkloadCdkProject" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject"></a>

Projen project for customer workload CDK projects.

This is for customer-specific workload code that runs on the platform.
Does NOT include the platform license.

#### Initializers <a name="Initializers" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.Initializer"></a>

```typescript
import { RocketleapWorkloadCdkProject } from '@rocketleap/rocketleap-projen'

new RocketleapWorkloadCdkProject(options: RocketleapCdkProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.Initializer.parameter.options">options</a></code> | <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions">RocketleapCdkProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions">RocketleapCdkProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |

---

##### `toString` <a name="toString" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `pnpm projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "projectCreation()" for all components, only if the project is being created for the first time
6. Call "postSynthesize()" for all components of this project
7. Call "this.postSynthesize()"
8. Call "postProjectCreation()" for all components, only if the project is being created for the first time

##### `tryFindFile` <a name="tryFindFile" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDeps` <a name="addDeps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `pnpm projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `pnpm
add/update`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### `removeScript` <a name="removeScript" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.isConstruct"></a>

```typescript
import { RocketleapWorkloadCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapWorkloadCdkProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.isProject"></a>

```typescript
import { RocketleapWorkloadCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapWorkloadCdkProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.of"></a>

```typescript
import { RocketleapWorkloadCdkProject } from '@rocketleap/rocketleap-projen'

RocketleapWorkloadCdkProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.runner">runner</a></code> | <code>projen.typescript.TypeScriptRunner</code> | The TypeScript runner used for executing TypeScript files. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.appEntrypoint">appEntrypoint</a></code> | <code>string</code> | The CDK app entrypoint. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkConfig">cdkConfig</a></code> | <code>projen.awscdk.CdkConfig</code> | cdk.json configuration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkDeps">cdkDeps</a></code> | <code>projen.awscdk.AwsCdkDeps</code> | *No description.* |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkTasks">cdkTasks</a></code> | <code>projen.awscdk.CdkTasks</code> | Common CDK tasks. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkVersion">cdkVersion</a></code> | <code>string</code> | The CDK version this app is using. |

---

##### `node`<sup>Required</sup> <a name="node" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### ~~`initProject`~~<sup>Optional</sup> <a name="initProject" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.initProject"></a>

- *Deprecated:* use the `initProject` argument passed to `Component.projectCreation()` instead.

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.biome"></a>

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### `docsDirectory`<sup>Required</sup> <a name="docsDirectory" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### `libdir`<sup>Required</sup> <a name="libdir" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### `runner`<sup>Required</sup> <a name="runner" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.runner"></a>

```typescript
public readonly runner: TypeScriptRunner;
```

- *Type:* projen.typescript.TypeScriptRunner

The TypeScript runner used for executing TypeScript files.

---

##### `srcdir`<sup>Required</sup> <a name="srcdir" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### `tsconfigDev`<sup>Required</sup> <a name="tsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### `watchTask`<sup>Required</sup> <a name="watchTask" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.watchTask"></a>

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.eslint"></a>

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `tsconfigEslint`<sup>Optional</sup> <a name="tsconfigEslint" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.tsconfigEslint"></a>

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `appEntrypoint`<sup>Required</sup> <a name="appEntrypoint" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.appEntrypoint"></a>

```typescript
public readonly appEntrypoint: string;
```

- *Type:* string

The CDK app entrypoint.

---

##### `cdkConfig`<sup>Required</sup> <a name="cdkConfig" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkConfig"></a>

```typescript
public readonly cdkConfig: CdkConfig;
```

- *Type:* projen.awscdk.CdkConfig

cdk.json configuration.

---

##### `cdkDeps`<sup>Required</sup> <a name="cdkDeps" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkDeps"></a>

```typescript
public readonly cdkDeps: AwsCdkDeps;
```

- *Type:* projen.awscdk.AwsCdkDeps

---

##### `cdkTasks`<sup>Required</sup> <a name="cdkTasks" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkTasks"></a>

```typescript
public readonly cdkTasks: CdkTasks;
```

- *Type:* projen.awscdk.CdkTasks

Common CDK tasks.

---

##### `cdkVersion`<sup>Required</sup> <a name="cdkVersion" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.cdkVersion"></a>

```typescript
public readonly cdkVersion: string;
```

- *Type:* string

The CDK version this app is using.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### `DEFAULT_TS_JEST_TRANFORM_PATTERN`<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@rocketleap/rocketleap-projen.RocketleapWorkloadCdkProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

## Structs <a name="Structs" id="Structs"></a>

### CdkDiffOptions <a name="CdkDiffOptions" id="@rocketleap/rocketleap-projen.CdkDiffOptions"></a>

Configuration for the `corymhall/cdk-diff-action@v2` step run inside the generated PR diff workflow (`pr-main.yml`).

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.CdkDiffOptions.Initializer"></a>

```typescript
import { CdkDiffOptions } from '@rocketleap/rocketleap-projen'

const cdkDiffOptions: CdkDiffOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.CdkDiffOptions.property.failOnDestructiveChanges">failOnDestructiveChanges</a></code> | <code>boolean</code> | Fail the diff workflow when destructive changes are detected. |

---

##### `failOnDestructiveChanges`<sup>Optional</sup> <a name="failOnDestructiveChanges" id="@rocketleap/rocketleap-projen.CdkDiffOptions.property.failOnDestructiveChanges"></a>

```typescript
public readonly failOnDestructiveChanges: boolean;
```

- *Type:* boolean
- *Default:* false

Fail the diff workflow when destructive changes are detected.

Default: `false` — destructive changes are surfaced in the rich PR
comment for reviewer attention but don't block the workflow. The
GitHub Environment approval on prod-tier deploy jobs is the gate;
CI just shows what would change.

---

### PipelineOptions <a name="PipelineOptions" id="@rocketleap/rocketleap-projen.PipelineOptions"></a>

Pipeline workflow configuration for a Rocketleap CDK project.

Emits a single `main` → prod pipeline: `build` uploads a workspace
artifact once (excluding `node_modules`), then per-stage diff/deploy
jobs download the workspace, reinstall via the yarn cache, assume
`CdkDeployRole` in the stage's account, and `yarn synth` inside the
target account. `push-main.yml` deploys stages sequentially with
consecutive same-environment stages grouped into a parallel fan-out
under one GitHub Environment gate.

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.PipelineOptions.Initializer"></a>

```typescript
import { PipelineOptions } from '@rocketleap/rocketleap-projen'

const pipelineOptions: PipelineOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.PipelineOptions.property.stages">stages</a></code> | <code><a href="#@rocketleap/rocketleap-projen.PipelineStage">PipelineStage</a>[]</code> | Ordered list of stages the `main` → prod pipeline promotes through. |
| <code><a href="#@rocketleap/rocketleap-projen.PipelineOptions.property.cdkDiff">cdkDiff</a></code> | <code><a href="#@rocketleap/rocketleap-projen.CdkDiffOptions">CdkDiffOptions</a></code> | Customize the `corymhall/cdk-diff-action` step used in the PR diff workflow. |

---

##### `stages`<sup>Required</sup> <a name="stages" id="@rocketleap/rocketleap-projen.PipelineOptions.property.stages"></a>

```typescript
public readonly stages: PipelineStage[];
```

- *Type:* <a href="#@rocketleap/rocketleap-projen.PipelineStage">PipelineStage</a>[]

Ordered list of stages the `main` → prod pipeline promotes through.

---

##### `cdkDiff`<sup>Optional</sup> <a name="cdkDiff" id="@rocketleap/rocketleap-projen.PipelineOptions.property.cdkDiff"></a>

```typescript
public readonly cdkDiff: CdkDiffOptions;
```

- *Type:* <a href="#@rocketleap/rocketleap-projen.CdkDiffOptions">CdkDiffOptions</a>
- *Default:* failOnDestructiveChanges: false

Customize the `corymhall/cdk-diff-action` step used in the PR diff workflow.

---

### PipelineStage <a name="PipelineStage" id="@rocketleap/rocketleap-projen.PipelineStage"></a>

A stage in the ordered `main` → prod pipeline.

`environment` is used both as the CDK app file segment for
`yarn synth` (looks at `bin/<environment>.ts` or
`bin/<environment>/<workload>.ts`) and as the GitHub Environment
name applied to the deploy job. Gating for a stage is configured
entirely via required reviewers on the matching GitHub Environment
in the repo settings.

`workload` is only used by multi-app projects.

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.PipelineStage.Initializer"></a>

```typescript
import { PipelineStage } from '@rocketleap/rocketleap-projen'

const pipelineStage: PipelineStage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.PipelineStage.property.environment">environment</a></code> | <code>string</code> | The CDK app file segment AND the GitHub Environment name. |
| <code><a href="#@rocketleap/rocketleap-projen.PipelineStage.property.workload">workload</a></code> | <code>string</code> | Optional workload name for multi-app projects. |

---

##### `environment`<sup>Required</sup> <a name="environment" id="@rocketleap/rocketleap-projen.PipelineStage.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The CDK app file segment AND the GitHub Environment name.

---

##### `workload`<sup>Optional</sup> <a name="workload" id="@rocketleap/rocketleap-projen.PipelineStage.property.workload"></a>

```typescript
public readonly workload: string;
```

- *Type:* string

Optional workload name for multi-app projects.

---

### RocketleapCdkProjectOptions <a name="RocketleapCdkProjectOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions"></a>

RocketleapCdkProjectOptions.

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.Initializer"></a>

```typescript
import { RocketleapCdkProjectOptions } from '@rocketleap/rocketleap-projen'

const rocketleapCdkProjectOptions: RocketleapCdkProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.company">company</a></code> | <code>string</code> | The company identifier used for package scoping. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pipeline">pipeline</a></code> | <code><a href="#@rocketleap/rocketleap-projen.PipelineOptions">PipelineOptions</a></code> | Configuration for the generated CDK pipeline GitHub Actions workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.project">project</a></code> | <code>string</code> | The project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.addPackageManagerToDevEngines">addPackageManagerToDevEngines</a></code> | <code>boolean</code> | Automatically add the resolved `packageManager` to `devEngines.packageManager` in `package.json`, setting `onFail` to `ignore`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.allowScripts">allowScripts</a></code> | <code>string[]</code> | List of dependency (package) names that are allowed to run lifecycle install scripts (`preinstall`, `install`, `postinstall`, `prepare`) during dependency installation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.app">app</a></code> | <code>string</code> | The command line to execute in order to synthesize the CDK application (language specific). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.appEntrypoint">appEntrypoint</a></code> | <code>string</code> | The CDK app's entrypoint (relative to the source directory, which is "src" by default). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.auditDeps">auditDeps</a></code> | <code>boolean</code> | Run security audit on dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.auditDepsOptions">auditDepsOptions</a></code> | <code>projen.javascript.AuditOptions</code> | Security audit options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorOrganization">authorOrganization</a></code> | <code>boolean</code> | Is the author an organization. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorUrl">authorUrl</a></code> | <code>string</code> | Author's URL / Website. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoApproveUpgrades">autoApproveUpgrades</a></code> | <code>boolean</code> | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoDetectBin">autoDetectBin</a></code> | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bin">bin</a></code> | <code>{[ key: string ]: string}</code> | Binary programs vended with your module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.biome">biome</a></code> | <code>boolean</code> | Setup Biome. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.biomeOptions">biomeOptions</a></code> | <code>projen.javascript.BiomeOptions</code> | Biome options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bugsEmail">bugsEmail</a></code> | <code>string</code> | The email address to which issues should be reported. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bugsUrl">bugsUrl</a></code> | <code>string</code> | The url to your project's issue tracker. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildCommand">buildCommand</a></code> | <code>string</code> | A command to execute before synthesis. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildingBlocksVersion">buildingBlocksVersion</a></code> | <code>string</code> | The Rocketleap building blocks CDK version to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildWorkflow">buildWorkflow</a></code> | <code>boolean</code> | Define a GitHub workflow for building PRs. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildWorkflowOptions">buildWorkflowOptions</a></code> | <code>projen.javascript.BuildWorkflowOptions</code> | Options for PR build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bumpPackage">bumpPackage</a></code> | <code>string</code> | The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bundledDeps">bundledDeps</a></code> | <code>string[]</code> | List of dependencies to bundle into this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bundlerOptions">bundlerOptions</a></code> | <code>projen.javascript.BundlerOptions</code> | Options for `Bundler`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bunVersion">bunVersion</a></code> | <code>string</code> | The version of Bun to use if using Bun as a package manager. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkCliVersion">cdkCliVersion</a></code> | <code>string</code> | Version range of the AWS CDK CLI to depend on. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkout">cdkout</a></code> | <code>string</code> | cdk.out directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkVersion">cdkVersion</a></code> | <code>string</code> | The AWS CDK version to use in the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkVersionPinning">cdkVersionPinning</a></code> | <code>boolean</code> | Use pinned version instead of caret version for CDK. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.checkLicenses">checkLicenses</a></code> | <code>projen.javascript.LicenseCheckerOptions</code> | Configure which licenses should be deemed acceptable for use by dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code>projen.javascript.CodeArtifactOptions</code> | Options for npm packages using AWS CodeArtifact. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.codeCov">codeCov</a></code> | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.codeCovTokenSecret">codeCovTokenSecret</a></code> | <code>string</code> | Define the secret name for a specified https://codecov.io/ token. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.constructsVersion">constructsVersion</a></code> | <code>string</code> | Minimum version of the `constructs` library to depend on. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.constructVersion">constructVersion</a></code> | <code>string</code> | The constructs library version to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.context">context</a></code> | <code>{[ key: string ]: any}</code> | Additional context to include in `cdk.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.copyrightOwner">copyrightOwner</a></code> | <code>string</code> | License copyright owner. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.copyrightPeriod">copyrightPeriod</a></code> | <code>string</code> | The copyright years to put in the LICENSE file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.deleteOrphanedLockFiles">deleteOrphanedLockFiles</a></code> | <code>boolean</code> | Automatically delete lockfiles from package managers that are not the active one. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.dependabot">dependabot</a></code> | <code>boolean</code> | Use dependabot to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.dependabotOptions">dependabotOptions</a></code> | <code>projen.github.DependabotOptions</code> | Options for dependabot. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | Runtime dependencies of this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.depsUpgrade">depsUpgrade</a></code> | <code>boolean</code> | Use tasks and github workflows to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.depsUpgradeOptions">depsUpgradeOptions</a></code> | <code>projen.javascript.UpgradeDependenciesOptions</code> | Options for `UpgradeDependencies`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.description">description</a></code> | <code>string</code> | The description is just a string that helps people understand the purpose of the package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Build dependencies for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.devEngines">devEngines</a></code> | <code>projen.javascript.DevEngines</code> | Configure the `devEngines` field in `package.json`. The `devEngines.packageManager` field is automatically populated based on the resolved `packageManager` value. Any fields provided here are merged with the auto-populated `packageManager` entry. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.disableTsconfig">disableTsconfig</a></code> | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.disableTsconfigDev">disableTsconfigDev</a></code> | <code>boolean</code> | Do not generate a development tsconfig file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.docgen">docgen</a></code> | <code>boolean</code> | Docgen by Typedoc. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | Docs directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.edgeLambdaAutoDiscover">edgeLambdaAutoDiscover</a></code> | <code>boolean</code> | Automatically adds an `cloudfront.experimental.EdgeFunction` for each `.edge-lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.entrypoint">entrypoint</a></code> | <code>string</code> | Module entrypoint (`main` in `package.json`). Set to an empty string to not include `main` in your package.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.entrypointTypes">entrypointTypes</a></code> | <code>string</code> | The .d.ts file that includes the type declarations for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.eslint">eslint</a></code> | <code>boolean</code> | Setup eslint. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.eslintOptions">eslintOptions</a></code> | <code>projen.javascript.EslintOptions</code> | Eslint options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.experimentalIntegRunner">experimentalIntegRunner</a></code> | <code>boolean</code> | Enable experimental support for the AWS CDK integ-runner. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.featureFlags">featureFlags</a></code> | <code>projen.awscdk.ICdkFeatureFlags</code> | Feature flags that should be enabled in `cdk.json`. Make sure to double-check any changes to feature flags in `cdk.json` before deploying. Unexpected changes may cause breaking changes in your CDK app. You can overwrite any feature flag by passing it into the context field. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitignore">gitignore</a></code> | <code>string[]</code> | Additional entries to .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.integrationTestAutoDiscover">integrationTestAutoDiscover</a></code> | <code>boolean</code> | Automatically discovers and creates integration tests for each `.integ.ts` file in under your test directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.jest">jest</a></code> | <code>boolean</code> | Setup jest unit tests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.jestOptions">jestOptions</a></code> | <code>projen.javascript.JestOptions</code> | Jest options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords to include in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.lambdaAutoDiscover">lambdaAutoDiscover</a></code> | <code>boolean</code> | Automatically adds an `awscdk.LambdaFunction` for each `.lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.lambdaExtensionAutoDiscover">lambdaExtensionAutoDiscover</a></code> | <code>boolean</code> | Automatically adds an `awscdk.LambdaExtension` for each `.lambda-extension.ts` entrypoint in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.lambdaOptions">lambdaOptions</a></code> | <code>projen.awscdk.LambdaFunctionCommonOptions</code> | Common options for all AWS Lambda functions. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.libdir">libdir</a></code> | <code>string</code> | Typescript  artifacts output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.license">license</a></code> | <code>string</code> | License's SPDX identifier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.licensed">licensed</a></code> | <code>boolean</code> | Indicates if a license should be added. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | The maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.nextVersionCommand">nextVersionCommand</a></code> | <code>string</code> | A shell command to control the next version to release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmAccess">npmAccess</a></code> | <code>projen.javascript.NpmAccess</code> | Access level of the npm package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmignoreEnabled">npmignoreEnabled</a></code> | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmIgnoreOptions">npmIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when the package is published. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmRegistryUrl">npmRegistryUrl</a></code> | <code>string</code> | The base URL of the npm package registry. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmTrustedPublishing">npmTrustedPublishing</a></code> | <code>boolean</code> | Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. Relative to this directory, all files are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.package">package</a></code> | <code>boolean</code> | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The Node Package Manager used to execute scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | The "name" in package.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.peerDependencyOptions">peerDependencyOptions</a></code> | <code>projen.javascript.PeerDependencyOptions</code> | Options for `peerDeps`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.peerDeps">peerDeps</a></code> | <code>string[]</code> | Peer dependencies for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pnpmOptions">pnpmOptions</a></code> | <code>projen.javascript.PnpmOptions</code> | Options for pnpm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pnpmVersion">pnpmVersion</a></code> | <code>string</code> | The version of PNPM to use if using PNPM as a package manager. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.prettier">prettier</a></code> | <code>boolean</code> | Setup prettier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.prettierOptions">prettierOptions</a></code> | <code>projen.javascript.PrettierOptions</code> | Prettier options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenDevDependency">projenDevDependency</a></code> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options for .projenrc.js. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcTs">projenrcTs</a></code> | <code>boolean</code> | Use TypeScript for your projenrc file (`.projenrc.ts`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcTsOptions">projenrcTsOptions</a></code> | <code>projen.typescript.ProjenrcOptions</code> | Options for .projenrc.ts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | Version of projen to install. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Include a GitHub pull request template. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pullRequestTemplateContents">pullRequestTemplateContents</a></code> | <code>string[]</code> | The contents of the pull request template. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.release">release</a></code> | <code>boolean</code> | Add release management to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: projen.release.BranchOptions}</code> | Defines additional release branches. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseEnvironment">releaseEnvironment</a></code> | <code>string</code> | The GitHub Actions environment used for the release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseToNpm">releaseToNpm</a></code> | <code>boolean</code> | Automatically release to npm when new versions are introduced. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code>projen.release.ReleaseTrigger</code> | The release trigger to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseWorkflowEnv">releaseWorkflowEnv</a></code> | <code>{[ key: string ]: string}</code> | Build environment variables for release workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.repository">repository</a></code> | <code>string</code> | The repository is the location where the actual code for your package lives. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.repositoryDirectory">repositoryDirectory</a></code> | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.requireApproval">requireApproval</a></code> | <code>projen.awscdk.ApprovalLevel</code> | To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.runner">runner</a></code> | <code>projen.typescript.TypeScriptRunner</code> | The TypeScript runner to use for executing TypeScript files. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.sampleCode">sampleCode</a></code> | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.scopedPackagesOptions">scopedPackagesOptions</a></code> | <code>projen.javascript.ScopedPackagesOptions[]</code> | Options for privately hosted scoped packages. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.singletonLambdaAutoDiscover">singletonLambdaAutoDiscover</a></code> | <code>boolean</code> | Automatically adds an `awscdk.SingletonFunction` for each `.singleton-lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.srcdir">srcdir</a></code> | <code>string</code> | Typescript sources directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.stability">stability</a></code> | <code>string</code> | Package's Stability. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.testdir">testdir</a></code> | <code>string</code> | Jest tests directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom TSConfig. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom tsconfig options for the development tsconfig.json file (used for testing). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsconfigDevFile">tsconfigDevFile</a></code> | <code>string</code> | The name (and path) of the development tsconfig file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsJestOptions">tsJestOptions</a></code> | <code>projen.typescript.TsJestOptions</code> | Options for ts-jest. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.typescriptVersion">typescriptVersion</a></code> | <code>string</code> | TypeScript version to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.watchExcludes">watchExcludes</a></code> | <code>string[]</code> | Glob patterns to exclude from `cdk watch`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.watchIncludes">watchIncludes</a></code> | <code>string[]</code> | Glob patterns to include in `cdk watch`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowBootstrapSteps">workflowBootstrapSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Workflow steps to use in order to bootstrap this repo. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowGitIdentity">workflowGitIdentity</a></code> | <code>projen.github.GitIdentity</code> | The git identity to use in workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | The node version used in GitHub Actions workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowPackageCache">workflowPackageCache</a></code> | <code>boolean</code> | Enable Node.js package cache in GitHub workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.yarnBerryOptions">yarnBerryOptions</a></code> | <code>projen.javascript.YarnBerryOptions</code> | Options for Yarn Berry. |

---

##### `company`<sup>Required</sup> <a name="company" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.company"></a>

```typescript
public readonly company: string;
```

- *Type:* string

The company identifier used for package scoping.

---

##### `pipeline`<sup>Required</sup> <a name="pipeline" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pipeline"></a>

```typescript
public readonly pipeline: PipelineOptions;
```

- *Type:* <a href="#@rocketleap/rocketleap-projen.PipelineOptions">PipelineOptions</a>

Configuration for the generated CDK pipeline GitHub Actions workflows.

Drives the matrix of (environment, workload) pairs used by pr-main.yml and push-main.yml, and optionally enables the GitOps production-promotion flow.

---

##### `project`<sup>Required</sup> <a name="project" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

The project name.

---

##### `addPackageManagerToDevEngines`<sup>Optional</sup> <a name="addPackageManagerToDevEngines" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.addPackageManagerToDevEngines"></a>

```typescript
public readonly addPackageManagerToDevEngines: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add the resolved `packageManager` to `devEngines.packageManager` in `package.json`, setting `onFail` to `ignore`.

---

##### `allowLibraryDependencies`<sup>Optional</sup> <a name="allowLibraryDependencies" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.allowLibraryDependencies"></a>

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning
for specifying these.

---

##### `allowScripts`<sup>Optional</sup> <a name="allowScripts" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.allowScripts"></a>

```typescript
public readonly allowScripts: string[];
```

- *Type:* string[]
- *Default:* all install scripts are allowed to run (package manager default)

List of dependency (package) names that are allowed to run lifecycle install scripts (`preinstall`, `install`, `postinstall`, `prepare`) during dependency installation.

These scripts can execute arbitrary code, making them a common
supply-chain attack vector. Package managers are moving toward
blocking them by default and requiring an explicit allowlist.
Configuring `allowScripts` sets up that allowlist so scripts only run
for the packages you have explicitly reviewed and trust.

Support for this setting depends on the configured `packageManager`:

- `NPM`: written to the native `allowScripts` field in `package.json`
  (requires npm >= 11.16; see https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts).
- `BUN`: written to the native `trustedDependencies` field in
  `package.json` (see https://bun.com/docs/pm/lifecycle).
- `PNPM`: written to the `onlyBuiltDependencies` setting in
  `pnpm-workspace.yaml` (see https://pnpm.io/settings#onlybuiltdependencies).
- `YARN2`, `YARN_BERRY`: written to the native
  `dependenciesMeta.<pkg>.built` allowlist in `package.json`, combined
  with `enableScripts: false` in `.yarnrc.yml` (see
  https://yarnpkg.com/features/security#postinstalls). If you set
  `yarnBerryOptions.yarnRcOptions.enableScripts` explicitly, that value
  is respected instead of being overridden.
- `YARN`, `YARN_CLASSIC`: not supported. Yarn Classic has no native
  mechanism to allowlist install scripts for specific dependencies.
  Setting this option with one of these package managers throws an
  error at synthesis time.

---

##### `app`<sup>Optional</sup> <a name="app" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.app"></a>

```typescript
public readonly app: string;
```

- *Type:* string

The command line to execute in order to synthesize the CDK application (language specific).

---

##### `appEntrypoint`<sup>Optional</sup> <a name="appEntrypoint" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.appEntrypoint"></a>

```typescript
public readonly appEntrypoint: string;
```

- *Type:* string
- *Default:* "main.ts"

The CDK app's entrypoint (relative to the source directory, which is "src" by default).

---

##### `artifactsDirectory`<sup>Optional</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `auditDeps`<sup>Optional</sup> <a name="auditDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.auditDeps"></a>

```typescript
public readonly auditDeps: boolean;
```

- *Type:* boolean
- *Default:* false

Run security audit on dependencies.

When enabled, creates an "audit" task that checks for known security vulnerabilities
in dependencies. By default, runs during every build and checks for "high" severity
vulnerabilities or above in all dependencies (including dev dependencies).

---

##### `auditDepsOptions`<sup>Optional</sup> <a name="auditDepsOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.auditDepsOptions"></a>

```typescript
public readonly auditDepsOptions: AuditOptions;
```

- *Type:* projen.javascript.AuditOptions
- *Default:* default options

Security audit options.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### `authorOrganization`<sup>Optional</sup> <a name="authorOrganization" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorOrganization"></a>

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* boolean

Is the author an organization.

---

##### `authorUrl`<sup>Optional</sup> <a name="authorUrl" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.authorUrl"></a>

```typescript
public readonly authorUrl: string;
```

- *Type:* string

Author's URL / Website.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoApproveUpgrades`<sup>Optional</sup> <a name="autoApproveUpgrades" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoApproveUpgrades"></a>

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `autoDetectBin`<sup>Optional</sup> <a name="autoDetectBin" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoDetectBin"></a>

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `bin`<sup>Optional</sup> <a name="bin" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bin"></a>

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in
your `package.json`, but unless `autoDetectBin` is `false`, every
executable file under `bin` will automatically be added to this section.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.biome"></a>

```typescript
public readonly biome: boolean;
```

- *Type:* boolean
- *Default:* false

Setup Biome.

---

##### `biomeOptions`<sup>Optional</sup> <a name="biomeOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.biomeOptions"></a>

```typescript
public readonly biomeOptions: BiomeOptions;
```

- *Type:* projen.javascript.BiomeOptions
- *Default:* default options

Biome options.

---

##### `bugsEmail`<sup>Optional</sup> <a name="bugsEmail" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bugsEmail"></a>

```typescript
public readonly bugsEmail: string;
```

- *Type:* string

The email address to which issues should be reported.

---

##### `bugsUrl`<sup>Optional</sup> <a name="bugsUrl" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bugsUrl"></a>

```typescript
public readonly bugsUrl: string;
```

- *Type:* string

The url to your project's issue tracker.

---

##### `buildCommand`<sup>Optional</sup> <a name="buildCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildCommand"></a>

```typescript
public readonly buildCommand: string;
```

- *Type:* string
- *Default:* no build command

A command to execute before synthesis.

This command will be called when
running `cdk synth` or when `cdk watch` identifies a change in your source
code before redeployment.

---

##### `buildingBlocksVersion`<sup>Optional</sup> <a name="buildingBlocksVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildingBlocksVersion"></a>

```typescript
public readonly buildingBlocksVersion: string;
```

- *Type:* string
- *Default:* 'LATEST'

The Rocketleap building blocks CDK version to use.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### `buildWorkflowOptions`<sup>Optional</sup> <a name="buildWorkflowOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.buildWorkflowOptions"></a>

```typescript
public readonly buildWorkflowOptions: BuildWorkflowOptions;
```

- *Type:* projen.javascript.BuildWorkflowOptions

Options for PR build workflow.

---

##### `bumpPackage`<sup>Optional</sup> <a name="bumpPackage" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bumpPackage"></a>

```typescript
public readonly bumpPackage: string;
```

- *Type:* string
- *Default:* A recent version of "commit-and-tag-version"

The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.

This can be any compatible package version, including the deprecated `standard-version@9`.

---

##### `bundledDeps`<sup>Optional</sup> <a name="bundledDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bundledDeps"></a>

```typescript
public readonly bundledDeps: string[];
```

- *Type:* string[]

List of dependencies to bundle into this module.

These modules will be
added both to the `dependencies` section and `bundledDependencies` section of
your `package.json`.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `bundlerOptions`<sup>Optional</sup> <a name="bundlerOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bundlerOptions"></a>

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* projen.javascript.BundlerOptions

Options for `Bundler`.

---

##### `bunVersion`<sup>Optional</sup> <a name="bunVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.bunVersion"></a>

```typescript
public readonly bunVersion: string;
```

- *Type:* string
- *Default:* "latest"

The version of Bun to use if using Bun as a package manager.

---

##### `cdkCliVersion`<sup>Optional</sup> <a name="cdkCliVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkCliVersion"></a>

```typescript
public readonly cdkCliVersion: string;
```

- *Type:* string
- *Default:* "^2"

Version range of the AWS CDK CLI to depend on.

Can be either a specific version, or an NPM version range.

By default, the latest 2.x version will be installed; you can use this
option to restrict it to a specific version or version range.

---

##### `cdkout`<sup>Optional</sup> <a name="cdkout" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkout"></a>

```typescript
public readonly cdkout: string;
```

- *Type:* string
- *Default:* "cdk.out"

cdk.out directory.

---

##### `cdkVersion`<sup>Optional</sup> <a name="cdkVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkVersion"></a>

```typescript
public readonly cdkVersion: string;
```

- *Type:* string
- *Default:* 'LATEST'

The AWS CDK version to use in the project.

---

##### `cdkVersionPinning`<sup>Optional</sup> <a name="cdkVersionPinning" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.cdkVersionPinning"></a>

```typescript
public readonly cdkVersionPinning: boolean;
```

- *Type:* boolean

Use pinned version instead of caret version for CDK.

You can use this to prevent mixed versions for your CDK dependencies and to prevent auto-updates.
If you use experimental features this will let you define the moment you include breaking changes.

---

##### `checkLicenses`<sup>Optional</sup> <a name="checkLicenses" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.checkLicenses"></a>

```typescript
public readonly checkLicenses: LicenseCheckerOptions;
```

- *Type:* projen.javascript.LicenseCheckerOptions
- *Default:* no license checks are run during the build and all licenses will be accepted

Configure which licenses should be deemed acceptable for use by dependencies.

This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* projen.javascript.CodeArtifactOptions
- *Default:* undefined

Options for npm packages using AWS CodeArtifact.

This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact

---

##### `codeCov`<sup>Optional</sup> <a name="codeCov" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.codeCov"></a>

```typescript
public readonly codeCov: boolean;
```

- *Type:* boolean
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`.

---

##### `codeCovTokenSecret`<sup>Optional</sup> <a name="codeCovTokenSecret" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.codeCovTokenSecret"></a>

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* string
- *Default:* OIDC auth is used

Define the secret name for a specified https://codecov.io/ token.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `constructsVersion`<sup>Optional</sup> <a name="constructsVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.constructsVersion"></a>

```typescript
public readonly constructsVersion: string;
```

- *Type:* string
- *Default:* for CDK 1.x the default is "3.2.27", for CDK 2.x the default is "10.5.1".

Minimum version of the `constructs` library to depend on.

---

##### `constructVersion`<sup>Optional</sup> <a name="constructVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.constructVersion"></a>

```typescript
public readonly constructVersion: string;
```

- *Type:* string
- *Default:* 'LATEST'

The constructs library version to use.

---

##### `context`<sup>Optional</sup> <a name="context" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.context"></a>

```typescript
public readonly context: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* no additional context

Additional context to include in `cdk.json`.

---

##### `copyrightOwner`<sup>Optional</sup> <a name="copyrightOwner" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.copyrightOwner"></a>

```typescript
public readonly copyrightOwner: string;
```

- *Type:* string
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### `copyrightPeriod`<sup>Optional</sup> <a name="copyrightPeriod" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.copyrightPeriod"></a>

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* string
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### `deleteOrphanedLockFiles`<sup>Optional</sup> <a name="deleteOrphanedLockFiles" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.deleteOrphanedLockFiles"></a>

```typescript
public readonly deleteOrphanedLockFiles: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically delete lockfiles from package managers that are not the active one.

Only triggered when the lockfile for the configured package
manager already exists.

This is useful when migrating between package managers to avoid conflicts.

---

##### `dependabot`<sup>Optional</sup> <a name="dependabot" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.dependabot"></a>

```typescript
public readonly dependabot: boolean;
```

- *Type:* boolean
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### `dependabotOptions`<sup>Optional</sup> <a name="dependabotOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.dependabotOptions"></a>

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* projen.github.DependabotOptions
- *Default:* default options

Options for dependabot.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `depsUpgrade`<sup>Optional</sup> <a name="depsUpgrade" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.depsUpgrade"></a>

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* boolean
- *Default:* `true` for root projects, `false` for subprojects

Use tasks and github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### `depsUpgradeOptions`<sup>Optional</sup> <a name="depsUpgradeOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.depsUpgradeOptions"></a>

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* projen.javascript.UpgradeDependenciesOptions
- *Default:* default options

Options for `UpgradeDependencies`.

---

##### `description`<sup>Optional</sup> <a name="description" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well.
See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be
available in your build environment but will not be fetched when this
module is consumed.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `devEngines`<sup>Optional</sup> <a name="devEngines" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.devEngines"></a>

```typescript
public readonly devEngines: DevEngines;
```

- *Type:* projen.javascript.DevEngines

Configure the `devEngines` field in `package.json`. The `devEngines.packageManager` field is automatically populated based on the resolved `packageManager` value. Any fields provided here are merged with the auto-populated `packageManager` entry.

---

##### `disableTsconfig`<sup>Optional</sup> <a name="disableTsconfig" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.disableTsconfig"></a>

```typescript
public readonly disableTsconfig: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).

---

##### `disableTsconfigDev`<sup>Optional</sup> <a name="disableTsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.disableTsconfigDev"></a>

```typescript
public readonly disableTsconfigDev: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a development tsconfig file.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean
- *Default:* false

Docgen by Typedoc.

---

##### `docsDirectory`<sup>Optional</sup> <a name="docsDirectory" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string
- *Default:* "docs"

Docs directory.

---

##### `edgeLambdaAutoDiscover`<sup>Optional</sup> <a name="edgeLambdaAutoDiscover" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.edgeLambdaAutoDiscover"></a>

```typescript
public readonly edgeLambdaAutoDiscover: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically adds an `cloudfront.experimental.EdgeFunction` for each `.edge-lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project.

---

##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`). Set to an empty string to not include `main` in your package.json.

---

##### `entrypointTypes`<sup>Optional</sup> <a name="entrypointTypes" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.entrypointTypes"></a>

```typescript
public readonly entrypointTypes: string;
```

- *Type:* string
- *Default:* .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)

The .d.ts file that includes the type declarations for this module.

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.eslint"></a>

```typescript
public readonly eslint: boolean;
```

- *Type:* boolean
- *Default:* true, unless biome is enabled

Setup eslint.

---

##### `eslintOptions`<sup>Optional</sup> <a name="eslintOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.eslintOptions"></a>

```typescript
public readonly eslintOptions: EslintOptions;
```

- *Type:* projen.javascript.EslintOptions
- *Default:* opinionated default options

Eslint options.

---

##### `experimentalIntegRunner`<sup>Optional</sup> <a name="experimentalIntegRunner" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.experimentalIntegRunner"></a>

```typescript
public readonly experimentalIntegRunner: boolean;
```

- *Type:* boolean
- *Default:* false

Enable experimental support for the AWS CDK integ-runner.

---

##### `featureFlags`<sup>Optional</sup> <a name="featureFlags" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.featureFlags"></a>

```typescript
public readonly featureFlags: ICdkFeatureFlags;
```

- *Type:* projen.awscdk.ICdkFeatureFlags
- *Default:* no feature flags are enabled by default

Feature flags that should be enabled in `cdk.json`. Make sure to double-check any changes to feature flags in `cdk.json` before deploying. Unexpected changes may cause breaking changes in your CDK app. You can overwrite any feature flag by passing it into the context field.

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitignore`<sup>Optional</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitignore"></a>

```typescript
public readonly gitignore: string[];
```

- *Type:* string[]

Additional entries to .gitignore.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### `integrationTestAutoDiscover`<sup>Optional</sup> <a name="integrationTestAutoDiscover" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.integrationTestAutoDiscover"></a>

```typescript
public readonly integrationTestAutoDiscover: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically discovers and creates integration tests for each `.integ.ts` file in under your test directory.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.jest"></a>

```typescript
public readonly jest: boolean;
```

- *Type:* boolean
- *Default:* true

Setup jest unit tests.

---

##### `jestOptions`<sup>Optional</sup> <a name="jestOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.jestOptions"></a>

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* projen.javascript.JestOptions
- *Default:* default options

Jest options.

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords to include in `package.json`.

---

##### `lambdaAutoDiscover`<sup>Optional</sup> <a name="lambdaAutoDiscover" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.lambdaAutoDiscover"></a>

```typescript
public readonly lambdaAutoDiscover: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically adds an `awscdk.LambdaFunction` for each `.lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project.

---

##### `lambdaExtensionAutoDiscover`<sup>Optional</sup> <a name="lambdaExtensionAutoDiscover" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.lambdaExtensionAutoDiscover"></a>

```typescript
public readonly lambdaExtensionAutoDiscover: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically adds an `awscdk.LambdaExtension` for each `.lambda-extension.ts` entrypoint in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project.

---

##### `lambdaOptions`<sup>Optional</sup> <a name="lambdaOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.lambdaOptions"></a>

```typescript
public readonly lambdaOptions: LambdaFunctionCommonOptions;
```

- *Type:* projen.awscdk.LambdaFunctionCommonOptions
- *Default:* default options

Common options for all AWS Lambda functions.

---

##### `libdir`<sup>Optional</sup> <a name="libdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string
- *Default:* "lib"

Typescript  artifacts output directory.

---

##### `license`<sup>Optional</sup> <a name="license" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
Use the `licensed` option if you want to no license to be specified.

---

##### `licensed`<sup>Optional</sup> <a name="licensed" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.licensed"></a>

```typescript
public readonly licensed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates if a license should be added.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string
- *Default:* no maximum version is enforced

The maximum node version supported by this package.

Most projects should not use this option.
The value indicates that the package is incompatible with any newer versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option.
Consider this option only if your package is known to not function with newer versions of node.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string
- *Default:* no minimum version is enforced

The minimum node version required by this package to function.

Most projects should not use this option.
The value indicates that the package is incompatible with any older versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option, even if your package is incompatible with EOL versions of node.
Consider this option only if your package depends on a specific feature, that is not available in other LTS versions.
Setting this option has very high impact on the consumers of your package,
as package managers will actively prevent usage with node versions you have marked as incompatible.

To change the node version of your CI/CD workflows, use `workflowNodeVersion`.

---

##### `nextVersionCommand`<sup>Optional</sup> <a name="nextVersionCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.nextVersionCommand"></a>

```typescript
public readonly nextVersionCommand: string;
```

- *Type:* string
- *Default:* The next version will be determined based on the commit history and project settings.

A shell command to control the next version to release.

If present, this shell command will be run before the bump is executed, and
it determines what version to release. It will be executed in the following
environment:

- Working directory: the project directory.
- `$VERSION`: the current version. Looks like `1.2.3`.
- `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
- `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.

The command should print one of the following to `stdout`:

- Nothing: the next version number will be determined based on commit history.
- `x.y.z`: the next version number will be `x.y.z`.
- `major|minor|patch`: the next version number will be the current version number
  with the indicated component bumped.

This setting cannot be specified together with `minMajorVersion`; the invoked
script can be used to achieve the effects of `minMajorVersion`.

---

##### `npmAccess`<sup>Optional</sup> <a name="npmAccess" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmAccess"></a>

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* projen.javascript.NpmAccess
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `npmignoreEnabled`<sup>Optional</sup> <a name="npmignoreEnabled" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmignoreEnabled"></a>

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### `npmIgnoreOptions`<sup>Optional</sup> <a name="npmIgnoreOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmIgnoreOptions"></a>

```typescript
public readonly npmIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .npmignore file.

---

##### `npmProvenance`<sup>Optional</sup> <a name="npmProvenance" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmProvenance"></a>

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* true for public packages, false otherwise

Should provenance statements be generated when the package is published.

A supported package manager is required to publish a package with npm provenance statements and
you will need to use a supported CI/CD provider.

Note that the projen `Release` and `Publisher` components are using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

---

##### `npmRegistryUrl`<sup>Optional</sup> <a name="npmRegistryUrl" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmRegistryUrl"></a>

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* string
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="npmTokenSecret" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmTokenSecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `npmTrustedPublishing`<sup>Optional</sup> <a name="npmTrustedPublishing" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.npmTrustedPublishing"></a>

```typescript
public readonly npmTrustedPublishing: boolean;
```

- *Type:* boolean
- *Default:* false

Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project. Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `package`<sup>Optional</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### `packageManager`<sup>Optional</sup> <a name="packageManager" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.packageManager"></a>

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager
- *Default:* Detected from the calling process or `YARN_CLASSIC` if detection fails.

The Node Package Manager used to execute scripts.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string
- *Default:* defaults to project name

The "name" in package.json.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `peerDependencyOptions`<sup>Optional</sup> <a name="peerDependencyOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.peerDependencyOptions"></a>

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* projen.javascript.PeerDependencyOptions

Options for `peerDeps`.

---

##### `peerDeps`<sup>Optional</sup> <a name="peerDeps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.peerDeps"></a>

```typescript
public readonly peerDeps: string[];
```

- *Type:* string[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to
be installed (and satisfied) by the _consumer_ of this library. Using peer
dependencies allows you to ensure that only a single module of a certain
library exists in the `node_modules` tree of your consumers.

Note that prior to npm@7, peer dependencies are _not_ automatically
installed, which means that adding peer dependencies to a library will be a
breaking change for your customers.

Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
enabled by default), projen will automatically add a dev dependency with a
pinned version for each peer dependency. This will ensure that you build &
test your module against the lowest peer version required.

---

##### `pnpmOptions`<sup>Optional</sup> <a name="pnpmOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pnpmOptions"></a>

```typescript
public readonly pnpmOptions: PnpmOptions;
```

- *Type:* projen.javascript.PnpmOptions
- *Default:* all default options

Options for pnpm.

---

##### `pnpmVersion`<sup>Optional</sup> <a name="pnpmVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pnpmVersion"></a>

```typescript
public readonly pnpmVersion: string;
```

- *Type:* string
- *Default:* "10.33.0"

The version of PNPM to use if using PNPM as a package manager.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.prettier"></a>

```typescript
public readonly prettier: boolean;
```

- *Type:* boolean
- *Default:* false

Setup prettier.

---

##### `prettierOptions`<sup>Optional</sup> <a name="prettierOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.prettierOptions"></a>

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* projen.javascript.PrettierOptions
- *Default:* default options

Prettier options.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### `projenDevDependency`<sup>Optional</sup> <a name="projenDevDependency" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenDevDependency"></a>

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Indicates of "projen" should be installed as a devDependency.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projenrcJs" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projenrcJsOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcJsOptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options for .projenrc.js.

---

##### `projenrcTs`<sup>Optional</sup> <a name="projenrcTs" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcTs"></a>

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* boolean
- *Default:* false

Use TypeScript for your projenrc file (`.projenrc.ts`).

---

##### `projenrcTsOptions`<sup>Optional</sup> <a name="projenrcTsOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenrcTsOptions"></a>

```typescript
public readonly projenrcTsOptions: ProjenrcOptions;
```

- *Type:* projen.typescript.ProjenrcOptions

Options for .projenrc.ts.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="pullRequestTemplate" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pullRequestTemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Include a GitHub pull request template.

---

##### `pullRequestTemplateContents`<sup>Optional</sup> <a name="pullRequestTemplateContents" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.pullRequestTemplateContents"></a>

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* string[]
- *Default:* default content

The contents of the pull request template.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.release"></a>

```typescript
public readonly release: boolean;
```

- *Type:* boolean
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: projen.release.BranchOptions}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### `releaseEnvironment`<sup>Optional</sup> <a name="releaseEnvironment" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseEnvironment"></a>

```typescript
public readonly releaseEnvironment: string;
```

- *Type:* string
- *Default:* no environment used, unless set at the artifact level

The GitHub Actions environment used for the release.

This can be used to add an explicit approval step to the release
or limit who can initiate a release through environment protection rules.

When multiple artifacts are released, the environment can be overwritten
on a per artifact basis.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags.

Useful if you are releasing on multiple branches with overlapping version numbers.
Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseToNpm`<sup>Optional</sup> <a name="releaseToNpm" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseToNpm"></a>

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* boolean
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* projen.release.ReleaseTrigger
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowEnv`<sup>Optional</sup> <a name="releaseWorkflowEnv" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseWorkflowEnv"></a>

```typescript
public readonly releaseWorkflowEnv: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Build environment variables for release workflows.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### `repositoryDirectory`<sup>Optional</sup> <a name="repositoryDirectory" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.repositoryDirectory"></a>

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* string

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### `requireApproval`<sup>Optional</sup> <a name="requireApproval" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.requireApproval"></a>

```typescript
public readonly requireApproval: ApprovalLevel;
```

- *Type:* projen.awscdk.ApprovalLevel
- *Default:* ApprovalLevel.BROADENING

To protect you against unintended changes that affect your security posture, the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.

---

##### `runner`<sup>Optional</sup> <a name="runner" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.runner"></a>

```typescript
public readonly runner: TypeScriptRunner;
```

- *Type:* projen.typescript.TypeScriptRunner
- *Default:* TypeScriptRunner.tsNode()

The TypeScript runner to use for executing TypeScript files.

This is a project-level setting that components (e.g. projenrc) will
use as their default runner.

---

##### `sampleCode`<sup>Optional</sup> <a name="sampleCode" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.sampleCode"></a>

```typescript
public readonly sampleCode: boolean;
```

- *Type:* boolean
- *Default:* true

Generate one-time sample in `src/` and `test/` if there are no files there.

---

##### `scopedPackagesOptions`<sup>Optional</sup> <a name="scopedPackagesOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.scopedPackagesOptions"></a>

```typescript
public readonly scopedPackagesOptions: ScopedPackagesOptions[];
```

- *Type:* projen.javascript.ScopedPackagesOptions[]
- *Default:* fetch all scoped packages from the public npm registry

Options for privately hosted scoped packages.

---

##### `singletonLambdaAutoDiscover`<sup>Optional</sup> <a name="singletonLambdaAutoDiscover" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.singletonLambdaAutoDiscover"></a>

```typescript
public readonly singletonLambdaAutoDiscover: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically adds an `awscdk.SingletonFunction` for each `.singleton-lambda.ts` handler in your source tree. If this is disabled, you can manually add an `awscdk.AutoDiscover` component to your project.

---

##### `srcdir`<sup>Optional</sup> <a name="srcdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string
- *Default:* "src"

Typescript sources directory.

---

##### `stability`<sup>Optional</sup> <a name="stability" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.stability"></a>

```typescript
public readonly stability: string;
```

- *Type:* string

Package's Stability.

---

##### `stale`<sup>Optional</sup> <a name="stale" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `testdir`<sup>Optional</sup> <a name="testdir" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string
- *Default:* "test"

Jest tests directory.

Tests files should be named `xxx.test.ts`.
If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
then tests are going to be compiled into `lib/` and executed as javascript.
If the test directory is outside of `src`, then we configure jest to
compile the code in-memory.

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* default options

Custom TSConfig.

---

##### `tsconfigDev`<sup>Optional</sup> <a name="tsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* use the production tsconfig options

Custom tsconfig options for the development tsconfig.json file (used for testing).

---

##### `tsconfigDevFile`<sup>Optional</sup> <a name="tsconfigDevFile" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsconfigDevFile"></a>

```typescript
public readonly tsconfigDevFile: string;
```

- *Type:* string
- *Default:* "{testdir}/tsconfig.json"

The name (and path) of the development tsconfig file.

By default this lives inside the test directory (e.g. `test/tsconfig.json`)
so that the TypeScript language service resolves it as the nearest config
for test files.

---

##### `tsJestOptions`<sup>Optional</sup> <a name="tsJestOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.tsJestOptions"></a>

```typescript
public readonly tsJestOptions: TsJestOptions;
```

- *Type:* projen.typescript.TsJestOptions

Options for ts-jest.

---

##### `typescriptVersion`<sup>Optional</sup> <a name="typescriptVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.typescriptVersion"></a>

```typescript
public readonly typescriptVersion: string;
```

- *Type:* string
- *Default:* "latest"

TypeScript version to use.

NOTE: Typescript is not semantically versioned and should remain on the
same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `watchExcludes`<sup>Optional</sup> <a name="watchExcludes" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.watchExcludes"></a>

```typescript
public readonly watchExcludes: string[];
```

- *Type:* string[]
- *Default:* []

Glob patterns to exclude from `cdk watch`.

---

##### `watchIncludes`<sup>Optional</sup> <a name="watchIncludes" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.watchIncludes"></a>

```typescript
public readonly watchIncludes: string[];
```

- *Type:* string[]
- *Default:* []

Glob patterns to include in `cdk watch`.

---

##### `workflowBootstrapSteps`<sup>Optional</sup> <a name="workflowBootstrapSteps" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowBootstrapSteps"></a>

```typescript
public readonly workflowBootstrapSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowGitIdentity`<sup>Optional</sup> <a name="workflowGitIdentity" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowGitIdentity"></a>

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* projen.github.GitIdentity
- *Default:* default GitHub Actions user

The git identity to use in workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* `minNodeVersion` if set, otherwise `lts/*`.

The node version used in GitHub Actions workflows.

Always use this option if your GitHub Actions workflows require a specific to run.

---

##### `workflowPackageCache`<sup>Optional</sup> <a name="workflowPackageCache" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowPackageCache"></a>

```typescript
public readonly workflowPackageCache: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Node.js package cache in GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### `yarnBerryOptions`<sup>Optional</sup> <a name="yarnBerryOptions" id="@rocketleap/rocketleap-projen.RocketleapCdkProjectOptions.property.yarnBerryOptions"></a>

```typescript
public readonly yarnBerryOptions: YarnBerryOptions;
```

- *Type:* projen.javascript.YarnBerryOptions
- *Default:* Yarn Berry v4 with all default options

Options for Yarn Berry.

---

### RocketleapLibraryCdkProjectOptions <a name="RocketleapLibraryCdkProjectOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions"></a>

RocketleapLibraryCdkProjectOptions.

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.Initializer"></a>

```typescript
import { RocketleapLibraryCdkProjectOptions } from '@rocketleap/rocketleap-projen'

const rocketleapLibraryCdkProjectOptions: RocketleapLibraryCdkProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.company">company</a></code> | <code>string</code> | The company identifier used for package scoping. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.project">project</a></code> | <code>string</code> | The project name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.addPackageManagerToDevEngines">addPackageManagerToDevEngines</a></code> | <code>boolean</code> | Automatically add the resolved `packageManager` to `devEngines.packageManager` in `package.json`, setting `onFail` to `ignore`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.allowScripts">allowScripts</a></code> | <code>string[]</code> | List of dependency (package) names that are allowed to run lifecycle install scripts (`preinstall`, `install`, `postinstall`, `prepare`) during dependency installation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.auditDeps">auditDeps</a></code> | <code>boolean</code> | Run security audit on dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.auditDepsOptions">auditDepsOptions</a></code> | <code>projen.javascript.AuditOptions</code> | Security audit options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorOrganization">authorOrganization</a></code> | <code>boolean</code> | Is the author an organization. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorUrl">authorUrl</a></code> | <code>string</code> | Author's URL / Website. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoApproveUpgrades">autoApproveUpgrades</a></code> | <code>boolean</code> | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoDetectBin">autoDetectBin</a></code> | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bin">bin</a></code> | <code>{[ key: string ]: string}</code> | Binary programs vended with your module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.biome">biome</a></code> | <code>boolean</code> | Setup Biome. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.biomeOptions">biomeOptions</a></code> | <code>projen.javascript.BiomeOptions</code> | Biome options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bugsEmail">bugsEmail</a></code> | <code>string</code> | The email address to which issues should be reported. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bugsUrl">bugsUrl</a></code> | <code>string</code> | The url to your project's issue tracker. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.buildWorkflow">buildWorkflow</a></code> | <code>boolean</code> | Define a GitHub workflow for building PRs. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.buildWorkflowOptions">buildWorkflowOptions</a></code> | <code>projen.javascript.BuildWorkflowOptions</code> | Options for PR build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bumpPackage">bumpPackage</a></code> | <code>string</code> | The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bundledDeps">bundledDeps</a></code> | <code>string[]</code> | List of dependencies to bundle into this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bundlerOptions">bundlerOptions</a></code> | <code>projen.javascript.BundlerOptions</code> | Options for `Bundler`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bunVersion">bunVersion</a></code> | <code>string</code> | The version of Bun to use if using Bun as a package manager. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.cdkVersion">cdkVersion</a></code> | <code>string</code> | The AWS CDK version to use as peer dependency. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.checkLicenses">checkLicenses</a></code> | <code>projen.javascript.LicenseCheckerOptions</code> | Configure which licenses should be deemed acceptable for use by dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code>projen.javascript.CodeArtifactOptions</code> | Options for npm packages using AWS CodeArtifact. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.codeCov">codeCov</a></code> | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.codeCovTokenSecret">codeCovTokenSecret</a></code> | <code>string</code> | Define the secret name for a specified https://codecov.io/ token. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.constructVersion">constructVersion</a></code> | <code>string</code> | The constructs library version to use as peer dependency. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.copyrightOwner">copyrightOwner</a></code> | <code>string</code> | License copyright owner. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.copyrightPeriod">copyrightPeriod</a></code> | <code>string</code> | The copyright years to put in the LICENSE file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.deleteOrphanedLockFiles">deleteOrphanedLockFiles</a></code> | <code>boolean</code> | Automatically delete lockfiles from package managers that are not the active one. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.dependabot">dependabot</a></code> | <code>boolean</code> | Use dependabot to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.dependabotOptions">dependabotOptions</a></code> | <code>projen.github.DependabotOptions</code> | Options for dependabot. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | Runtime dependencies of this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.depsUpgrade">depsUpgrade</a></code> | <code>boolean</code> | Use tasks and github workflows to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.depsUpgradeOptions">depsUpgradeOptions</a></code> | <code>projen.javascript.UpgradeDependenciesOptions</code> | Options for `UpgradeDependencies`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.description">description</a></code> | <code>string</code> | The description is just a string that helps people understand the purpose of the package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Build dependencies for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.devEngines">devEngines</a></code> | <code>projen.javascript.DevEngines</code> | Configure the `devEngines` field in `package.json`. The `devEngines.packageManager` field is automatically populated based on the resolved `packageManager` value. Any fields provided here are merged with the auto-populated `packageManager` entry. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.disableTsconfig">disableTsconfig</a></code> | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.disableTsconfigDev">disableTsconfigDev</a></code> | <code>boolean</code> | Do not generate a development tsconfig file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.docgen">docgen</a></code> | <code>boolean</code> | Docgen by Typedoc. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | Docs directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.entrypoint">entrypoint</a></code> | <code>string</code> | Module entrypoint (`main` in `package.json`). Set to an empty string to not include `main` in your package.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.entrypointTypes">entrypointTypes</a></code> | <code>string</code> | The .d.ts file that includes the type declarations for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.eslint">eslint</a></code> | <code>boolean</code> | Setup eslint. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.eslintOptions">eslintOptions</a></code> | <code>projen.javascript.EslintOptions</code> | Eslint options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitignore">gitignore</a></code> | <code>string[]</code> | Additional entries to .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.jest">jest</a></code> | <code>boolean</code> | Setup jest unit tests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.jestOptions">jestOptions</a></code> | <code>projen.javascript.JestOptions</code> | Jest options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords to include in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.libdir">libdir</a></code> | <code>string</code> | Typescript  artifacts output directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.license">license</a></code> | <code>string</code> | License's SPDX identifier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.licensed">licensed</a></code> | <code>boolean</code> | Indicates if a license should be added. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | The maximum node version supported by this package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.nextVersionCommand">nextVersionCommand</a></code> | <code>string</code> | A shell command to control the next version to release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmAccess">npmAccess</a></code> | <code>projen.javascript.NpmAccess</code> | Access level of the npm package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmignoreEnabled">npmignoreEnabled</a></code> | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmIgnoreOptions">npmIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when the package is published. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmRegistryUrl">npmRegistryUrl</a></code> | <code>string</code> | The base URL of the npm package registry. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmTrustedPublishing">npmTrustedPublishing</a></code> | <code>boolean</code> | Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. Relative to this directory, all files are synthesized. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.package">package</a></code> | <code>boolean</code> | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The Node Package Manager used to execute scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | The "name" in package.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.peerDependencyOptions">peerDependencyOptions</a></code> | <code>projen.javascript.PeerDependencyOptions</code> | Options for `peerDeps`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.peerDeps">peerDeps</a></code> | <code>string[]</code> | Peer dependencies for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pnpmOptions">pnpmOptions</a></code> | <code>projen.javascript.PnpmOptions</code> | Options for pnpm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pnpmVersion">pnpmVersion</a></code> | <code>string</code> | The version of PNPM to use if using PNPM as a package manager. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.prettier">prettier</a></code> | <code>boolean</code> | Setup prettier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.prettierOptions">prettierOptions</a></code> | <code>projen.javascript.PrettierOptions</code> | Prettier options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenDevDependency">projenDevDependency</a></code> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options for .projenrc.js. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcTs">projenrcTs</a></code> | <code>boolean</code> | Use TypeScript for your projenrc file (`.projenrc.ts`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcTsOptions">projenrcTsOptions</a></code> | <code>projen.typescript.ProjenrcOptions</code> | Options for .projenrc.ts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | Version of projen to install. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Include a GitHub pull request template. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pullRequestTemplateContents">pullRequestTemplateContents</a></code> | <code>string[]</code> | The contents of the pull request template. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.release">release</a></code> | <code>boolean</code> | Add release management to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: projen.release.BranchOptions}</code> | Defines additional release branches. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseEnvironment">releaseEnvironment</a></code> | <code>string</code> | The GitHub Actions environment used for the release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseToNpm">releaseToNpm</a></code> | <code>boolean</code> | Automatically release to npm when new versions are introduced. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code>projen.release.ReleaseTrigger</code> | The release trigger to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseWorkflowEnv">releaseWorkflowEnv</a></code> | <code>{[ key: string ]: string}</code> | Build environment variables for release workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.repository">repository</a></code> | <code>string</code> | The repository is the location where the actual code for your package lives. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.repositoryDirectory">repositoryDirectory</a></code> | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.runner">runner</a></code> | <code>projen.typescript.TypeScriptRunner</code> | The TypeScript runner to use for executing TypeScript files. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.sampleCode">sampleCode</a></code> | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.scopedPackagesOptions">scopedPackagesOptions</a></code> | <code>projen.javascript.ScopedPackagesOptions[]</code> | Options for privately hosted scoped packages. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.srcdir">srcdir</a></code> | <code>string</code> | Typescript sources directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.stability">stability</a></code> | <code>string</code> | Package's Stability. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.testdir">testdir</a></code> | <code>string</code> | Jest tests directory. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom TSConfig. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom tsconfig options for the development tsconfig.json file (used for testing). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsconfigDevFile">tsconfigDevFile</a></code> | <code>string</code> | The name (and path) of the development tsconfig file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsJestOptions">tsJestOptions</a></code> | <code>projen.typescript.TsJestOptions</code> | Options for ts-jest. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.typescriptVersion">typescriptVersion</a></code> | <code>string</code> | TypeScript version to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowBootstrapSteps">workflowBootstrapSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Workflow steps to use in order to bootstrap this repo. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowGitIdentity">workflowGitIdentity</a></code> | <code>projen.github.GitIdentity</code> | The git identity to use in workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | The node version used in GitHub Actions workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowPackageCache">workflowPackageCache</a></code> | <code>boolean</code> | Enable Node.js package cache in GitHub workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.yarnBerryOptions">yarnBerryOptions</a></code> | <code>projen.javascript.YarnBerryOptions</code> | Options for Yarn Berry. |

---

##### `company`<sup>Required</sup> <a name="company" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.company"></a>

```typescript
public readonly company: string;
```

- *Type:* string

The company identifier used for package scoping.

---

##### `project`<sup>Required</sup> <a name="project" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

The project name.

---

##### `addPackageManagerToDevEngines`<sup>Optional</sup> <a name="addPackageManagerToDevEngines" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.addPackageManagerToDevEngines"></a>

```typescript
public readonly addPackageManagerToDevEngines: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add the resolved `packageManager` to `devEngines.packageManager` in `package.json`, setting `onFail` to `ignore`.

---

##### `allowLibraryDependencies`<sup>Optional</sup> <a name="allowLibraryDependencies" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.allowLibraryDependencies"></a>

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning
for specifying these.

---

##### `allowScripts`<sup>Optional</sup> <a name="allowScripts" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.allowScripts"></a>

```typescript
public readonly allowScripts: string[];
```

- *Type:* string[]
- *Default:* all install scripts are allowed to run (package manager default)

List of dependency (package) names that are allowed to run lifecycle install scripts (`preinstall`, `install`, `postinstall`, `prepare`) during dependency installation.

These scripts can execute arbitrary code, making them a common
supply-chain attack vector. Package managers are moving toward
blocking them by default and requiring an explicit allowlist.
Configuring `allowScripts` sets up that allowlist so scripts only run
for the packages you have explicitly reviewed and trust.

Support for this setting depends on the configured `packageManager`:

- `NPM`: written to the native `allowScripts` field in `package.json`
  (requires npm >= 11.16; see https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts).
- `BUN`: written to the native `trustedDependencies` field in
  `package.json` (see https://bun.com/docs/pm/lifecycle).
- `PNPM`: written to the `onlyBuiltDependencies` setting in
  `pnpm-workspace.yaml` (see https://pnpm.io/settings#onlybuiltdependencies).
- `YARN2`, `YARN_BERRY`: written to the native
  `dependenciesMeta.<pkg>.built` allowlist in `package.json`, combined
  with `enableScripts: false` in `.yarnrc.yml` (see
  https://yarnpkg.com/features/security#postinstalls). If you set
  `yarnBerryOptions.yarnRcOptions.enableScripts` explicitly, that value
  is respected instead of being overridden.
- `YARN`, `YARN_CLASSIC`: not supported. Yarn Classic has no native
  mechanism to allowlist install scripts for specific dependencies.
  Setting this option with one of these package managers throws an
  error at synthesis time.

---

##### `artifactsDirectory`<sup>Optional</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `auditDeps`<sup>Optional</sup> <a name="auditDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.auditDeps"></a>

```typescript
public readonly auditDeps: boolean;
```

- *Type:* boolean
- *Default:* false

Run security audit on dependencies.

When enabled, creates an "audit" task that checks for known security vulnerabilities
in dependencies. By default, runs during every build and checks for "high" severity
vulnerabilities or above in all dependencies (including dev dependencies).

---

##### `auditDepsOptions`<sup>Optional</sup> <a name="auditDepsOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.auditDepsOptions"></a>

```typescript
public readonly auditDepsOptions: AuditOptions;
```

- *Type:* projen.javascript.AuditOptions
- *Default:* default options

Security audit options.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### `authorOrganization`<sup>Optional</sup> <a name="authorOrganization" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorOrganization"></a>

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* boolean

Is the author an organization.

---

##### `authorUrl`<sup>Optional</sup> <a name="authorUrl" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.authorUrl"></a>

```typescript
public readonly authorUrl: string;
```

- *Type:* string

Author's URL / Website.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoApproveUpgrades`<sup>Optional</sup> <a name="autoApproveUpgrades" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoApproveUpgrades"></a>

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `autoDetectBin`<sup>Optional</sup> <a name="autoDetectBin" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoDetectBin"></a>

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `bin`<sup>Optional</sup> <a name="bin" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bin"></a>

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in
your `package.json`, but unless `autoDetectBin` is `false`, every
executable file under `bin` will automatically be added to this section.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.biome"></a>

```typescript
public readonly biome: boolean;
```

- *Type:* boolean
- *Default:* false

Setup Biome.

---

##### `biomeOptions`<sup>Optional</sup> <a name="biomeOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.biomeOptions"></a>

```typescript
public readonly biomeOptions: BiomeOptions;
```

- *Type:* projen.javascript.BiomeOptions
- *Default:* default options

Biome options.

---

##### `bugsEmail`<sup>Optional</sup> <a name="bugsEmail" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bugsEmail"></a>

```typescript
public readonly bugsEmail: string;
```

- *Type:* string

The email address to which issues should be reported.

---

##### `bugsUrl`<sup>Optional</sup> <a name="bugsUrl" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bugsUrl"></a>

```typescript
public readonly bugsUrl: string;
```

- *Type:* string

The url to your project's issue tracker.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### `buildWorkflowOptions`<sup>Optional</sup> <a name="buildWorkflowOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.buildWorkflowOptions"></a>

```typescript
public readonly buildWorkflowOptions: BuildWorkflowOptions;
```

- *Type:* projen.javascript.BuildWorkflowOptions

Options for PR build workflow.

---

##### `bumpPackage`<sup>Optional</sup> <a name="bumpPackage" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bumpPackage"></a>

```typescript
public readonly bumpPackage: string;
```

- *Type:* string
- *Default:* A recent version of "commit-and-tag-version"

The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.

This can be any compatible package version, including the deprecated `standard-version@9`.

---

##### `bundledDeps`<sup>Optional</sup> <a name="bundledDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bundledDeps"></a>

```typescript
public readonly bundledDeps: string[];
```

- *Type:* string[]

List of dependencies to bundle into this module.

These modules will be
added both to the `dependencies` section and `bundledDependencies` section of
your `package.json`.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `bundlerOptions`<sup>Optional</sup> <a name="bundlerOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bundlerOptions"></a>

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* projen.javascript.BundlerOptions

Options for `Bundler`.

---

##### `bunVersion`<sup>Optional</sup> <a name="bunVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.bunVersion"></a>

```typescript
public readonly bunVersion: string;
```

- *Type:* string
- *Default:* "latest"

The version of Bun to use if using Bun as a package manager.

---

##### `cdkVersion`<sup>Optional</sup> <a name="cdkVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.cdkVersion"></a>

```typescript
public readonly cdkVersion: string;
```

- *Type:* string
- *Default:* 'LATEST'

The AWS CDK version to use as peer dependency.

---

##### `checkLicenses`<sup>Optional</sup> <a name="checkLicenses" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.checkLicenses"></a>

```typescript
public readonly checkLicenses: LicenseCheckerOptions;
```

- *Type:* projen.javascript.LicenseCheckerOptions
- *Default:* no license checks are run during the build and all licenses will be accepted

Configure which licenses should be deemed acceptable for use by dependencies.

This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* projen.javascript.CodeArtifactOptions
- *Default:* undefined

Options for npm packages using AWS CodeArtifact.

This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact

---

##### `codeCov`<sup>Optional</sup> <a name="codeCov" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.codeCov"></a>

```typescript
public readonly codeCov: boolean;
```

- *Type:* boolean
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`.

---

##### `codeCovTokenSecret`<sup>Optional</sup> <a name="codeCovTokenSecret" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.codeCovTokenSecret"></a>

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* string
- *Default:* OIDC auth is used

Define the secret name for a specified https://codecov.io/ token.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `constructVersion`<sup>Optional</sup> <a name="constructVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.constructVersion"></a>

```typescript
public readonly constructVersion: string;
```

- *Type:* string
- *Default:* 'LATEST'

The constructs library version to use as peer dependency.

---

##### `copyrightOwner`<sup>Optional</sup> <a name="copyrightOwner" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.copyrightOwner"></a>

```typescript
public readonly copyrightOwner: string;
```

- *Type:* string
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### `copyrightPeriod`<sup>Optional</sup> <a name="copyrightPeriod" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.copyrightPeriod"></a>

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* string
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### `deleteOrphanedLockFiles`<sup>Optional</sup> <a name="deleteOrphanedLockFiles" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.deleteOrphanedLockFiles"></a>

```typescript
public readonly deleteOrphanedLockFiles: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically delete lockfiles from package managers that are not the active one.

Only triggered when the lockfile for the configured package
manager already exists.

This is useful when migrating between package managers to avoid conflicts.

---

##### `dependabot`<sup>Optional</sup> <a name="dependabot" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.dependabot"></a>

```typescript
public readonly dependabot: boolean;
```

- *Type:* boolean
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### `dependabotOptions`<sup>Optional</sup> <a name="dependabotOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.dependabotOptions"></a>

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* projen.github.DependabotOptions
- *Default:* default options

Options for dependabot.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `depsUpgrade`<sup>Optional</sup> <a name="depsUpgrade" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.depsUpgrade"></a>

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* boolean
- *Default:* `true` for root projects, `false` for subprojects

Use tasks and github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### `depsUpgradeOptions`<sup>Optional</sup> <a name="depsUpgradeOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.depsUpgradeOptions"></a>

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* projen.javascript.UpgradeDependenciesOptions
- *Default:* default options

Options for `UpgradeDependencies`.

---

##### `description`<sup>Optional</sup> <a name="description" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well.
See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be
available in your build environment but will not be fetched when this
module is consumed.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `devEngines`<sup>Optional</sup> <a name="devEngines" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.devEngines"></a>

```typescript
public readonly devEngines: DevEngines;
```

- *Type:* projen.javascript.DevEngines

Configure the `devEngines` field in `package.json`. The `devEngines.packageManager` field is automatically populated based on the resolved `packageManager` value. Any fields provided here are merged with the auto-populated `packageManager` entry.

---

##### `disableTsconfig`<sup>Optional</sup> <a name="disableTsconfig" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.disableTsconfig"></a>

```typescript
public readonly disableTsconfig: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).

---

##### `disableTsconfigDev`<sup>Optional</sup> <a name="disableTsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.disableTsconfigDev"></a>

```typescript
public readonly disableTsconfigDev: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a development tsconfig file.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean
- *Default:* false

Docgen by Typedoc.

---

##### `docsDirectory`<sup>Optional</sup> <a name="docsDirectory" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string
- *Default:* "docs"

Docs directory.

---

##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`). Set to an empty string to not include `main` in your package.json.

---

##### `entrypointTypes`<sup>Optional</sup> <a name="entrypointTypes" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.entrypointTypes"></a>

```typescript
public readonly entrypointTypes: string;
```

- *Type:* string
- *Default:* .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)

The .d.ts file that includes the type declarations for this module.

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.eslint"></a>

```typescript
public readonly eslint: boolean;
```

- *Type:* boolean
- *Default:* true, unless biome is enabled

Setup eslint.

---

##### `eslintOptions`<sup>Optional</sup> <a name="eslintOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.eslintOptions"></a>

```typescript
public readonly eslintOptions: EslintOptions;
```

- *Type:* projen.javascript.EslintOptions
- *Default:* opinionated default options

Eslint options.

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitignore`<sup>Optional</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitignore"></a>

```typescript
public readonly gitignore: string[];
```

- *Type:* string[]

Additional entries to .gitignore.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.jest"></a>

```typescript
public readonly jest: boolean;
```

- *Type:* boolean
- *Default:* true

Setup jest unit tests.

---

##### `jestOptions`<sup>Optional</sup> <a name="jestOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.jestOptions"></a>

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* projen.javascript.JestOptions
- *Default:* default options

Jest options.

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords to include in `package.json`.

---

##### `libdir`<sup>Optional</sup> <a name="libdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string
- *Default:* "lib"

Typescript  artifacts output directory.

---

##### `license`<sup>Optional</sup> <a name="license" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
Use the `licensed` option if you want to no license to be specified.

---

##### `licensed`<sup>Optional</sup> <a name="licensed" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.licensed"></a>

```typescript
public readonly licensed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates if a license should be added.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string
- *Default:* no maximum version is enforced

The maximum node version supported by this package.

Most projects should not use this option.
The value indicates that the package is incompatible with any newer versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option.
Consider this option only if your package is known to not function with newer versions of node.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string
- *Default:* no minimum version is enforced

The minimum node version required by this package to function.

Most projects should not use this option.
The value indicates that the package is incompatible with any older versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option, even if your package is incompatible with EOL versions of node.
Consider this option only if your package depends on a specific feature, that is not available in other LTS versions.
Setting this option has very high impact on the consumers of your package,
as package managers will actively prevent usage with node versions you have marked as incompatible.

To change the node version of your CI/CD workflows, use `workflowNodeVersion`.

---

##### `nextVersionCommand`<sup>Optional</sup> <a name="nextVersionCommand" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.nextVersionCommand"></a>

```typescript
public readonly nextVersionCommand: string;
```

- *Type:* string
- *Default:* The next version will be determined based on the commit history and project settings.

A shell command to control the next version to release.

If present, this shell command will be run before the bump is executed, and
it determines what version to release. It will be executed in the following
environment:

- Working directory: the project directory.
- `$VERSION`: the current version. Looks like `1.2.3`.
- `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
- `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.

The command should print one of the following to `stdout`:

- Nothing: the next version number will be determined based on commit history.
- `x.y.z`: the next version number will be `x.y.z`.
- `major|minor|patch`: the next version number will be the current version number
  with the indicated component bumped.

This setting cannot be specified together with `minMajorVersion`; the invoked
script can be used to achieve the effects of `minMajorVersion`.

---

##### `npmAccess`<sup>Optional</sup> <a name="npmAccess" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmAccess"></a>

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* projen.javascript.NpmAccess
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `npmignoreEnabled`<sup>Optional</sup> <a name="npmignoreEnabled" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmignoreEnabled"></a>

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### `npmIgnoreOptions`<sup>Optional</sup> <a name="npmIgnoreOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmIgnoreOptions"></a>

```typescript
public readonly npmIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .npmignore file.

---

##### `npmProvenance`<sup>Optional</sup> <a name="npmProvenance" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmProvenance"></a>

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* true for public packages, false otherwise

Should provenance statements be generated when the package is published.

A supported package manager is required to publish a package with npm provenance statements and
you will need to use a supported CI/CD provider.

Note that the projen `Release` and `Publisher` components are using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

---

##### `npmRegistryUrl`<sup>Optional</sup> <a name="npmRegistryUrl" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmRegistryUrl"></a>

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* string
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="npmTokenSecret" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmTokenSecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `npmTrustedPublishing`<sup>Optional</sup> <a name="npmTrustedPublishing" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.npmTrustedPublishing"></a>

```typescript
public readonly npmTrustedPublishing: boolean;
```

- *Type:* boolean
- *Default:* false

Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project. Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `package`<sup>Optional</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### `packageManager`<sup>Optional</sup> <a name="packageManager" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.packageManager"></a>

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager
- *Default:* Detected from the calling process or `YARN_CLASSIC` if detection fails.

The Node Package Manager used to execute scripts.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string
- *Default:* defaults to project name

The "name" in package.json.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `peerDependencyOptions`<sup>Optional</sup> <a name="peerDependencyOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.peerDependencyOptions"></a>

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* projen.javascript.PeerDependencyOptions

Options for `peerDeps`.

---

##### `peerDeps`<sup>Optional</sup> <a name="peerDeps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.peerDeps"></a>

```typescript
public readonly peerDeps: string[];
```

- *Type:* string[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to
be installed (and satisfied) by the _consumer_ of this library. Using peer
dependencies allows you to ensure that only a single module of a certain
library exists in the `node_modules` tree of your consumers.

Note that prior to npm@7, peer dependencies are _not_ automatically
installed, which means that adding peer dependencies to a library will be a
breaking change for your customers.

Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
enabled by default), projen will automatically add a dev dependency with a
pinned version for each peer dependency. This will ensure that you build &
test your module against the lowest peer version required.

---

##### `pnpmOptions`<sup>Optional</sup> <a name="pnpmOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pnpmOptions"></a>

```typescript
public readonly pnpmOptions: PnpmOptions;
```

- *Type:* projen.javascript.PnpmOptions
- *Default:* all default options

Options for pnpm.

---

##### `pnpmVersion`<sup>Optional</sup> <a name="pnpmVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pnpmVersion"></a>

```typescript
public readonly pnpmVersion: string;
```

- *Type:* string
- *Default:* "10.33.0"

The version of PNPM to use if using PNPM as a package manager.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.prettier"></a>

```typescript
public readonly prettier: boolean;
```

- *Type:* boolean
- *Default:* false

Setup prettier.

---

##### `prettierOptions`<sup>Optional</sup> <a name="prettierOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.prettierOptions"></a>

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* projen.javascript.PrettierOptions
- *Default:* default options

Prettier options.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### `projenDevDependency`<sup>Optional</sup> <a name="projenDevDependency" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenDevDependency"></a>

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Indicates of "projen" should be installed as a devDependency.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projenrcJs" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projenrcJsOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcJsOptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options for .projenrc.js.

---

##### `projenrcTs`<sup>Optional</sup> <a name="projenrcTs" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcTs"></a>

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* boolean
- *Default:* false

Use TypeScript for your projenrc file (`.projenrc.ts`).

---

##### `projenrcTsOptions`<sup>Optional</sup> <a name="projenrcTsOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenrcTsOptions"></a>

```typescript
public readonly projenrcTsOptions: ProjenrcOptions;
```

- *Type:* projen.typescript.ProjenrcOptions

Options for .projenrc.ts.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="pullRequestTemplate" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pullRequestTemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Include a GitHub pull request template.

---

##### `pullRequestTemplateContents`<sup>Optional</sup> <a name="pullRequestTemplateContents" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.pullRequestTemplateContents"></a>

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* string[]
- *Default:* default content

The contents of the pull request template.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.release"></a>

```typescript
public readonly release: boolean;
```

- *Type:* boolean
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: projen.release.BranchOptions}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### `releaseEnvironment`<sup>Optional</sup> <a name="releaseEnvironment" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseEnvironment"></a>

```typescript
public readonly releaseEnvironment: string;
```

- *Type:* string
- *Default:* no environment used, unless set at the artifact level

The GitHub Actions environment used for the release.

This can be used to add an explicit approval step to the release
or limit who can initiate a release through environment protection rules.

When multiple artifacts are released, the environment can be overwritten
on a per artifact basis.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags.

Useful if you are releasing on multiple branches with overlapping version numbers.
Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseToNpm`<sup>Optional</sup> <a name="releaseToNpm" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseToNpm"></a>

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* boolean
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* projen.release.ReleaseTrigger
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowEnv`<sup>Optional</sup> <a name="releaseWorkflowEnv" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseWorkflowEnv"></a>

```typescript
public readonly releaseWorkflowEnv: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Build environment variables for release workflows.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### `repositoryDirectory`<sup>Optional</sup> <a name="repositoryDirectory" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.repositoryDirectory"></a>

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* string

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### `runner`<sup>Optional</sup> <a name="runner" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.runner"></a>

```typescript
public readonly runner: TypeScriptRunner;
```

- *Type:* projen.typescript.TypeScriptRunner
- *Default:* TypeScriptRunner.tsNode()

The TypeScript runner to use for executing TypeScript files.

This is a project-level setting that components (e.g. projenrc) will
use as their default runner.

---

##### `sampleCode`<sup>Optional</sup> <a name="sampleCode" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.sampleCode"></a>

```typescript
public readonly sampleCode: boolean;
```

- *Type:* boolean
- *Default:* true

Generate one-time sample in `src/` and `test/` if there are no files there.

---

##### `scopedPackagesOptions`<sup>Optional</sup> <a name="scopedPackagesOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.scopedPackagesOptions"></a>

```typescript
public readonly scopedPackagesOptions: ScopedPackagesOptions[];
```

- *Type:* projen.javascript.ScopedPackagesOptions[]
- *Default:* fetch all scoped packages from the public npm registry

Options for privately hosted scoped packages.

---

##### `srcdir`<sup>Optional</sup> <a name="srcdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string
- *Default:* "src"

Typescript sources directory.

---

##### `stability`<sup>Optional</sup> <a name="stability" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.stability"></a>

```typescript
public readonly stability: string;
```

- *Type:* string

Package's Stability.

---

##### `stale`<sup>Optional</sup> <a name="stale" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `testdir`<sup>Optional</sup> <a name="testdir" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string
- *Default:* "test"

Jest tests directory.

Tests files should be named `xxx.test.ts`.
If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
then tests are going to be compiled into `lib/` and executed as javascript.
If the test directory is outside of `src`, then we configure jest to
compile the code in-memory.

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* default options

Custom TSConfig.

---

##### `tsconfigDev`<sup>Optional</sup> <a name="tsconfigDev" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* use the production tsconfig options

Custom tsconfig options for the development tsconfig.json file (used for testing).

---

##### `tsconfigDevFile`<sup>Optional</sup> <a name="tsconfigDevFile" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsconfigDevFile"></a>

```typescript
public readonly tsconfigDevFile: string;
```

- *Type:* string
- *Default:* "{testdir}/tsconfig.json"

The name (and path) of the development tsconfig file.

By default this lives inside the test directory (e.g. `test/tsconfig.json`)
so that the TypeScript language service resolves it as the nearest config
for test files.

---

##### `tsJestOptions`<sup>Optional</sup> <a name="tsJestOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.tsJestOptions"></a>

```typescript
public readonly tsJestOptions: TsJestOptions;
```

- *Type:* projen.typescript.TsJestOptions

Options for ts-jest.

---

##### `typescriptVersion`<sup>Optional</sup> <a name="typescriptVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.typescriptVersion"></a>

```typescript
public readonly typescriptVersion: string;
```

- *Type:* string
- *Default:* "latest"

TypeScript version to use.

NOTE: Typescript is not semantically versioned and should remain on the
same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `workflowBootstrapSteps`<sup>Optional</sup> <a name="workflowBootstrapSteps" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowBootstrapSteps"></a>

```typescript
public readonly workflowBootstrapSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowGitIdentity`<sup>Optional</sup> <a name="workflowGitIdentity" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowGitIdentity"></a>

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* projen.github.GitIdentity
- *Default:* default GitHub Actions user

The git identity to use in workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* `minNodeVersion` if set, otherwise `lts/*`.

The node version used in GitHub Actions workflows.

Always use this option if your GitHub Actions workflows require a specific to run.

---

##### `workflowPackageCache`<sup>Optional</sup> <a name="workflowPackageCache" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowPackageCache"></a>

```typescript
public readonly workflowPackageCache: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Node.js package cache in GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### `yarnBerryOptions`<sup>Optional</sup> <a name="yarnBerryOptions" id="@rocketleap/rocketleap-projen.RocketleapLibraryCdkProjectOptions.property.yarnBerryOptions"></a>

```typescript
public readonly yarnBerryOptions: YarnBerryOptions;
```

- *Type:* projen.javascript.YarnBerryOptions
- *Default:* Yarn Berry v4 with all default options

Options for Yarn Berry.

---

### RocketleapPlatformMinimalProjectOptions <a name="RocketleapPlatformMinimalProjectOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions"></a>

Options for {@link RocketleapPlatformMinimalProject}.

Extends projen's `NodeProjectOptions` with the rocketleap `company` and
`project` slugs used to build the package name (`@<company>/<project>`).

#### Initializer <a name="Initializer" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.Initializer"></a>

```typescript
import { RocketleapPlatformMinimalProjectOptions } from '@rocketleap/rocketleap-projen'

const rocketleapPlatformMinimalProjectOptions: RocketleapPlatformMinimalProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.addPackageManagerToDevEngines">addPackageManagerToDevEngines</a></code> | <code>boolean</code> | Automatically add the resolved `packageManager` to `devEngines.packageManager` in `package.json`, setting `onFail` to `ignore`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.allowScripts">allowScripts</a></code> | <code>string[]</code> | List of dependency (package) names that are allowed to run lifecycle install scripts (`preinstall`, `install`, `postinstall`, `prepare`) during dependency installation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorOrganization">authorOrganization</a></code> | <code>boolean</code> | Is the author an organization. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorUrl">authorUrl</a></code> | <code>string</code> | Author's URL / Website. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoDetectBin">autoDetectBin</a></code> | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bin">bin</a></code> | <code>{[ key: string ]: string}</code> | Binary programs vended with your module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bugsEmail">bugsEmail</a></code> | <code>string</code> | The email address to which issues should be reported. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bugsUrl">bugsUrl</a></code> | <code>string</code> | The url to your project's issue tracker. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bundledDeps">bundledDeps</a></code> | <code>string[]</code> | List of dependencies to bundle into this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bunVersion">bunVersion</a></code> | <code>string</code> | The version of Bun to use if using Bun as a package manager. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code>projen.javascript.CodeArtifactOptions</code> | Options for npm packages using AWS CodeArtifact. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.deleteOrphanedLockFiles">deleteOrphanedLockFiles</a></code> | <code>boolean</code> | Automatically delete lockfiles from package managers that are not the active one. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | Runtime dependencies of this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.description">description</a></code> | <code>string</code> | The description is just a string that helps people understand the purpose of the package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Build dependencies for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.devEngines">devEngines</a></code> | <code>projen.javascript.DevEngines</code> | Configure the `devEngines` field in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.entrypoint">entrypoint</a></code> | <code>string</code> | Module entrypoint (`main` in `package.json`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords to include in `package.json`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.license">license</a></code> | <code>string</code> | License's SPDX identifier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.licensed">licensed</a></code> | <code>boolean</code> | Indicates if a license should be added. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | The maximum node version supported by this package. Most projects should not use this option. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. Most projects should not use this option. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmAccess">npmAccess</a></code> | <code>projen.javascript.NpmAccess</code> | Access level of the npm package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when the package is published. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmRegistryUrl">npmRegistryUrl</a></code> | <code>string</code> | The base URL of the npm package registry. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmTrustedPublishing">npmTrustedPublishing</a></code> | <code>boolean</code> | Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The Node Package Manager used to execute scripts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | The "name" in package.json. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.peerDependencyOptions">peerDependencyOptions</a></code> | <code>projen.javascript.PeerDependencyOptions</code> | Options for `peerDeps`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.peerDeps">peerDeps</a></code> | <code>string[]</code> | Peer dependencies for this module. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pnpmOptions">pnpmOptions</a></code> | <code>projen.javascript.PnpmOptions</code> | Options for pnpm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pnpmVersion">pnpmVersion</a></code> | <code>string</code> | The version of PNPM to use if using PNPM as a package manager. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.repository">repository</a></code> | <code>string</code> | The repository is the location where the actual code for your package lives. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.repositoryDirectory">repositoryDirectory</a></code> | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.scopedPackagesOptions">scopedPackagesOptions</a></code> | <code>projen.javascript.ScopedPackagesOptions[]</code> | Options for privately hosted scoped packages. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.stability">stability</a></code> | <code>string</code> | Package's Stability. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.yarnBerryOptions">yarnBerryOptions</a></code> | <code>projen.javascript.YarnBerryOptions</code> | Options for Yarn Berry. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bumpPackage">bumpPackage</a></code> | <code>string</code> | The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.nextVersionCommand">nextVersionCommand</a></code> | <code>string</code> | A shell command to control the next version to release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: projen.release.BranchOptions}</code> | Defines additional release branches. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseEnvironment">releaseEnvironment</a></code> | <code>string</code> | The GitHub Actions environment used for the release. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code>projen.release.ReleaseTrigger</code> | The release trigger to use. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseWorkflowEnv">releaseWorkflowEnv</a></code> | <code>{[ key: string ]: string}</code> | Build environment variables for release workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.auditDeps">auditDeps</a></code> | <code>boolean</code> | Run security audit on dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.auditDepsOptions">auditDepsOptions</a></code> | <code>projen.javascript.AuditOptions</code> | Security audit options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoApproveUpgrades">autoApproveUpgrades</a></code> | <code>boolean</code> | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.biome">biome</a></code> | <code>boolean</code> | Setup Biome. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.biomeOptions">biomeOptions</a></code> | <code>projen.javascript.BiomeOptions</code> | Biome options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.buildWorkflow">buildWorkflow</a></code> | <code>boolean</code> | Define a GitHub workflow for building PRs. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.buildWorkflowOptions">buildWorkflowOptions</a></code> | <code>projen.javascript.BuildWorkflowOptions</code> | Options for PR build workflow. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bundlerOptions">bundlerOptions</a></code> | <code>projen.javascript.BundlerOptions</code> | Options for `Bundler`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.checkLicenses">checkLicenses</a></code> | <code>projen.javascript.LicenseCheckerOptions</code> | Configure which licenses should be deemed acceptable for use by dependencies. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.codeCov">codeCov</a></code> | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.codeCovTokenSecret">codeCovTokenSecret</a></code> | <code>string</code> | Define the secret name for a specified https://codecov.io/ token. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.copyrightOwner">copyrightOwner</a></code> | <code>string</code> | License copyright owner. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.copyrightPeriod">copyrightPeriod</a></code> | <code>string</code> | The copyright years to put in the LICENSE file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.defaultReleaseBranch">defaultReleaseBranch</a></code> | <code>string</code> | The name of the main release branch. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.dependabot">dependabot</a></code> | <code>boolean</code> | Use dependabot to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.dependabotOptions">dependabotOptions</a></code> | <code>projen.github.DependabotOptions</code> | Options for dependabot. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.depsUpgrade">depsUpgrade</a></code> | <code>boolean</code> | Use tasks and github workflows to handle dependency upgrades. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.depsUpgradeOptions">depsUpgradeOptions</a></code> | <code>projen.javascript.UpgradeDependenciesOptions</code> | Options for `UpgradeDependencies`. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitignore">gitignore</a></code> | <code>string[]</code> | Additional entries to .gitignore. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.jest">jest</a></code> | <code>boolean</code> | Setup jest unit tests. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.jestOptions">jestOptions</a></code> | <code>projen.javascript.JestOptions</code> | Jest options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmignoreEnabled">npmignoreEnabled</a></code> | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmIgnoreOptions">npmIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .npmignore file. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.package">package</a></code> | <code>boolean</code> | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.prettier">prettier</a></code> | <code>boolean</code> | Setup prettier. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.prettierOptions">prettierOptions</a></code> | <code>projen.javascript.PrettierOptions</code> | Prettier options. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenDevDependency">projenDevDependency</a></code> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options for .projenrc.js. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | Version of projen to install. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Include a GitHub pull request template. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pullRequestTemplateContents">pullRequestTemplateContents</a></code> | <code>string[]</code> | The contents of the pull request template. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.release">release</a></code> | <code>boolean</code> | Add release management to this project. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseToNpm">releaseToNpm</a></code> | <code>boolean</code> | Automatically release to npm when new versions are introduced. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowBootstrapSteps">workflowBootstrapSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Workflow steps to use in order to bootstrap this repo. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowGitIdentity">workflowGitIdentity</a></code> | <code>projen.github.GitIdentity</code> | The git identity to use in workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | The node version used in GitHub Actions workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowPackageCache">workflowPackageCache</a></code> | <code>boolean</code> | Enable Node.js package cache in GitHub workflows. |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.company">company</a></code> | <code>string</code> | The owning company slug — used as the npm scope (e.g. `rocketleap`). |
| <code><a href="#@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.project">project</a></code> | <code>string</code> | The project slug — used as the package name suffix (e.g. `aws-nuke-templates`). |

---

##### `name`<sup>Required</sup> <a name="name" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

*Example*

```typescript
"{ filename: 'readme.md', contents: '# title' }"
```


##### `stale`<sup>Optional</sup> <a name="stale" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `addPackageManagerToDevEngines`<sup>Optional</sup> <a name="addPackageManagerToDevEngines" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.addPackageManagerToDevEngines"></a>

```typescript
public readonly addPackageManagerToDevEngines: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add the resolved `packageManager` to `devEngines.packageManager` in `package.json`, setting `onFail` to `ignore`.

---

##### `allowLibraryDependencies`<sup>Optional</sup> <a name="allowLibraryDependencies" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.allowLibraryDependencies"></a>

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning
for specifying these.

---

##### `allowScripts`<sup>Optional</sup> <a name="allowScripts" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.allowScripts"></a>

```typescript
public readonly allowScripts: string[];
```

- *Type:* string[]
- *Default:* all install scripts are allowed to run (package manager default)

List of dependency (package) names that are allowed to run lifecycle install scripts (`preinstall`, `install`, `postinstall`, `prepare`) during dependency installation.

These scripts can execute arbitrary code, making them a common
supply-chain attack vector. Package managers are moving toward
blocking them by default and requiring an explicit allowlist.
Configuring `allowScripts` sets up that allowlist so scripts only run
for the packages you have explicitly reviewed and trust.

Support for this setting depends on the configured `packageManager`:

- `NPM`: written to the native `allowScripts` field in `package.json`
  (requires npm >= 11.16; see https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts).
- `BUN`: written to the native `trustedDependencies` field in
  `package.json` (see https://bun.com/docs/pm/lifecycle).
- `PNPM`: written to the `onlyBuiltDependencies` setting in
  `pnpm-workspace.yaml` (see https://pnpm.io/settings#onlybuiltdependencies).
- `YARN2`, `YARN_BERRY`: written to the native
  `dependenciesMeta.<pkg>.built` allowlist in `package.json`, combined
  with `enableScripts: false` in `.yarnrc.yml` (see
  https://yarnpkg.com/features/security#postinstalls). If you set
  `yarnBerryOptions.yarnRcOptions.enableScripts` explicitly, that value
  is respected instead of being overridden.
- `YARN`, `YARN_CLASSIC`: not supported. Yarn Classic has no native
  mechanism to allowlist install scripts for specific dependencies.
  Setting this option with one of these package managers throws an
  error at synthesis time.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### `authorOrganization`<sup>Optional</sup> <a name="authorOrganization" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorOrganization"></a>

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* boolean

Is the author an organization.

---

##### `authorUrl`<sup>Optional</sup> <a name="authorUrl" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.authorUrl"></a>

```typescript
public readonly authorUrl: string;
```

- *Type:* string

Author's URL / Website.

---

##### `autoDetectBin`<sup>Optional</sup> <a name="autoDetectBin" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoDetectBin"></a>

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### `bin`<sup>Optional</sup> <a name="bin" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bin"></a>

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in
your `package.json`, but unless `autoDetectBin` is `false`, every
executable file under `bin` will automatically be added to this section.

---

##### `bugsEmail`<sup>Optional</sup> <a name="bugsEmail" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bugsEmail"></a>

```typescript
public readonly bugsEmail: string;
```

- *Type:* string

The email address to which issues should be reported.

---

##### `bugsUrl`<sup>Optional</sup> <a name="bugsUrl" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bugsUrl"></a>

```typescript
public readonly bugsUrl: string;
```

- *Type:* string

The url to your project's issue tracker.

---

##### `bundledDeps`<sup>Optional</sup> <a name="bundledDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bundledDeps"></a>

```typescript
public readonly bundledDeps: string[];
```

- *Type:* string[]

List of dependencies to bundle into this module.

These modules will be
added both to the `dependencies` section and `bundledDependencies` section of
your `package.json`.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

##### `bunVersion`<sup>Optional</sup> <a name="bunVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bunVersion"></a>

```typescript
public readonly bunVersion: string;
```

- *Type:* string
- *Default:* "latest"

The version of Bun to use if using Bun as a package manager.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* projen.javascript.CodeArtifactOptions
- *Default:* undefined

Options for npm packages using AWS CodeArtifact.

This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact

---

##### `deleteOrphanedLockFiles`<sup>Optional</sup> <a name="deleteOrphanedLockFiles" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.deleteOrphanedLockFiles"></a>

```typescript
public readonly deleteOrphanedLockFiles: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically delete lockfiles from package managers that are not the active one.

Only triggered when the lockfile for the configured package
manager already exists.

This is useful when migrating between package managers to avoid conflicts.

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

*Example*

```typescript
[ 'express', 'lodash', 'foo@^2' ]
```


##### `description`<sup>Optional</sup> <a name="description" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well.
See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be
available in your build environment but will not be fetched when this
module is consumed.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `pnpm add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `pnpm add` or `npm i` (e.g. `express@^2`) and
this will be what your `package.json` will eventually include.

---

*Example*

```typescript
[ 'typescript', '@types/express' ]
```


##### `devEngines`<sup>Optional</sup> <a name="devEngines" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.devEngines"></a>

```typescript
public readonly devEngines: DevEngines;
```

- *Type:* projen.javascript.DevEngines

Configure the `devEngines` field in `package.json`.

The `devEngines.packageManager` field is automatically populated based on
the resolved `packageManager` value. Any fields provided here are merged
with the auto-populated `packageManager` entry.

> [https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devengines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devengines)

---

##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`).

Set to an empty string to not include `main` in your package.json

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords to include in `package.json`.

---

##### `license`<sup>Optional</sup> <a name="license" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
Use the `licensed` option if you want to no license to be specified.

---

##### `licensed`<sup>Optional</sup> <a name="licensed" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.licensed"></a>

```typescript
public readonly licensed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates if a license should be added.

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string
- *Default:* no maximum version is enforced

The maximum node version supported by this package. Most projects should not use this option.

The value indicates that the package is incompatible with any newer versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option.
Consider this option only if your package is known to not function with newer versions of node.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string
- *Default:* no minimum version is enforced

The minimum node version required by this package to function. Most projects should not use this option.

The value indicates that the package is incompatible with any older versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option, even if your package is incompatible with EOL versions of node.
Consider this option only if your package depends on a specific feature, that is not available in other LTS versions.
Setting this option has very high impact on the consumers of your package,
as package managers will actively prevent usage with node versions you have marked as incompatible.

To change the node version of your CI/CD workflows, use `workflowNodeVersion`.

---

##### `npmAccess`<sup>Optional</sup> <a name="npmAccess" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmAccess"></a>

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* projen.javascript.NpmAccess
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### `npmProvenance`<sup>Optional</sup> <a name="npmProvenance" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmProvenance"></a>

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* true for public packages, false otherwise

Should provenance statements be generated when the package is published.

A supported package manager is required to publish a package with npm provenance statements and
you will need to use a supported CI/CD provider.

Note that the projen `Release` and `Publisher` components are using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

> [https://docs.npmjs.com/generating-provenance-statements](https://docs.npmjs.com/generating-provenance-statements)

---

##### `npmRegistryUrl`<sup>Optional</sup> <a name="npmRegistryUrl" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmRegistryUrl"></a>

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* string
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="npmTokenSecret" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmTokenSecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `npmTrustedPublishing`<sup>Optional</sup> <a name="npmTrustedPublishing" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmTrustedPublishing"></a>

```typescript
public readonly npmTrustedPublishing: boolean;
```

- *Type:* boolean
- *Default:* false

Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work.

---

##### `packageManager`<sup>Optional</sup> <a name="packageManager" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.packageManager"></a>

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager
- *Default:* Detected from the calling process or `YARN_CLASSIC` if detection fails.

The Node Package Manager used to execute scripts.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string
- *Default:* defaults to project name

The "name" in package.json.

---

##### `peerDependencyOptions`<sup>Optional</sup> <a name="peerDependencyOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.peerDependencyOptions"></a>

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* projen.javascript.PeerDependencyOptions

Options for `peerDeps`.

---

##### `peerDeps`<sup>Optional</sup> <a name="peerDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.peerDeps"></a>

```typescript
public readonly peerDeps: string[];
```

- *Type:* string[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to
be installed (and satisfied) by the _consumer_ of this library. Using peer
dependencies allows you to ensure that only a single module of a certain
library exists in the `node_modules` tree of your consumers.

Note that prior to npm@7, peer dependencies are _not_ automatically
installed, which means that adding peer dependencies to a library will be a
breaking change for your customers.

Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
enabled by default), projen will automatically add a dev dependency with a
pinned version for each peer dependency. This will ensure that you build &
test your module against the lowest peer version required.

---

##### `pnpmOptions`<sup>Optional</sup> <a name="pnpmOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pnpmOptions"></a>

```typescript
public readonly pnpmOptions: PnpmOptions;
```

- *Type:* projen.javascript.PnpmOptions
- *Default:* all default options

Options for pnpm.

---

##### `pnpmVersion`<sup>Optional</sup> <a name="pnpmVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pnpmVersion"></a>

```typescript
public readonly pnpmVersion: string;
```

- *Type:* string
- *Default:* "10.33.0"

The version of PNPM to use if using PNPM as a package manager.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### `repositoryDirectory`<sup>Optional</sup> <a name="repositoryDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.repositoryDirectory"></a>

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* string

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### `scopedPackagesOptions`<sup>Optional</sup> <a name="scopedPackagesOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.scopedPackagesOptions"></a>

```typescript
public readonly scopedPackagesOptions: ScopedPackagesOptions[];
```

- *Type:* projen.javascript.ScopedPackagesOptions[]
- *Default:* fetch all scoped packages from the public npm registry

Options for privately hosted scoped packages.

---

##### `stability`<sup>Optional</sup> <a name="stability" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.stability"></a>

```typescript
public readonly stability: string;
```

- *Type:* string

Package's Stability.

---

##### `yarnBerryOptions`<sup>Optional</sup> <a name="yarnBerryOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.yarnBerryOptions"></a>

```typescript
public readonly yarnBerryOptions: YarnBerryOptions;
```

- *Type:* projen.javascript.YarnBerryOptions
- *Default:* Yarn Berry v4 with all default options

Options for Yarn Berry.

---

##### `bumpPackage`<sup>Optional</sup> <a name="bumpPackage" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bumpPackage"></a>

```typescript
public readonly bumpPackage: string;
```

- *Type:* string
- *Default:* A recent version of "commit-and-tag-version"

The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.

This can be any compatible package version, including the deprecated `standard-version@9`.

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `nextVersionCommand`<sup>Optional</sup> <a name="nextVersionCommand" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.nextVersionCommand"></a>

```typescript
public readonly nextVersionCommand: string;
```

- *Type:* string
- *Default:* The next version will be determined based on the commit history and project settings.

A shell command to control the next version to release.

If present, this shell command will be run before the bump is executed, and
it determines what version to release. It will be executed in the following
environment:

- Working directory: the project directory.
- `$VERSION`: the current version. Looks like `1.2.3`.
- `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
- `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.

The command should print one of the following to `stdout`:

- Nothing: the next version number will be determined based on commit history.
- `x.y.z`: the next version number will be `x.y.z`.
- `major|minor|patch`: the next version number will be the current version number
  with the indicated component bumped.

This setting cannot be specified together with `minMajorVersion`; the invoked
script can be used to achieve the effects of `minMajorVersion`.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: projen.release.BranchOptions}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### `releaseEnvironment`<sup>Optional</sup> <a name="releaseEnvironment" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseEnvironment"></a>

```typescript
public readonly releaseEnvironment: string;
```

- *Type:* string
- *Default:* no environment used, unless set at the artifact level

The GitHub Actions environment used for the release.

This can be used to add an explicit approval step to the release
or limit who can initiate a release through environment protection rules.

When multiple artifacts are released, the environment can be overwritten
on a per artifact basis.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* projen.release.ReleaseTrigger
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowEnv`<sup>Optional</sup> <a name="releaseWorkflowEnv" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseWorkflowEnv"></a>

```typescript
public readonly releaseWorkflowEnv: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Build environment variables for release workflows.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### `artifactsDirectory`<sup>Optional</sup> <a name="artifactsDirectory" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `auditDeps`<sup>Optional</sup> <a name="auditDeps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.auditDeps"></a>

```typescript
public readonly auditDeps: boolean;
```

- *Type:* boolean
- *Default:* false

Run security audit on dependencies.

When enabled, creates an "audit" task that checks for known security vulnerabilities
in dependencies. By default, runs during every build and checks for "high" severity
vulnerabilities or above in all dependencies (including dev dependencies).

---

##### `auditDepsOptions`<sup>Optional</sup> <a name="auditDepsOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.auditDepsOptions"></a>

```typescript
public readonly auditDepsOptions: AuditOptions;
```

- *Type:* projen.javascript.AuditOptions
- *Default:* default options

Security audit options.

---

##### `autoApproveUpgrades`<sup>Optional</sup> <a name="autoApproveUpgrades" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.autoApproveUpgrades"></a>

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.biome"></a>

```typescript
public readonly biome: boolean;
```

- *Type:* boolean
- *Default:* false

Setup Biome.

---

##### `biomeOptions`<sup>Optional</sup> <a name="biomeOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.biomeOptions"></a>

```typescript
public readonly biomeOptions: BiomeOptions;
```

- *Type:* projen.javascript.BiomeOptions
- *Default:* default options

Biome options.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### `buildWorkflowOptions`<sup>Optional</sup> <a name="buildWorkflowOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.buildWorkflowOptions"></a>

```typescript
public readonly buildWorkflowOptions: BuildWorkflowOptions;
```

- *Type:* projen.javascript.BuildWorkflowOptions

Options for PR build workflow.

---

##### `bundlerOptions`<sup>Optional</sup> <a name="bundlerOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.bundlerOptions"></a>

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* projen.javascript.BundlerOptions

Options for `Bundler`.

---

##### `checkLicenses`<sup>Optional</sup> <a name="checkLicenses" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.checkLicenses"></a>

```typescript
public readonly checkLicenses: LicenseCheckerOptions;
```

- *Type:* projen.javascript.LicenseCheckerOptions
- *Default:* no license checks are run during the build and all licenses will be accepted

Configure which licenses should be deemed acceptable for use by dependencies.

This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.

---

##### `codeCov`<sup>Optional</sup> <a name="codeCov" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.codeCov"></a>

```typescript
public readonly codeCov: boolean;
```

- *Type:* boolean
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`.

---

##### `codeCovTokenSecret`<sup>Optional</sup> <a name="codeCovTokenSecret" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.codeCovTokenSecret"></a>

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* string
- *Default:* OIDC auth is used

Define the secret name for a specified https://codecov.io/ token.

---

##### `copyrightOwner`<sup>Optional</sup> <a name="copyrightOwner" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.copyrightOwner"></a>

```typescript
public readonly copyrightOwner: string;
```

- *Type:* string
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### `copyrightPeriod`<sup>Optional</sup> <a name="copyrightPeriod" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.copyrightPeriod"></a>

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* string
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### `defaultReleaseBranch`<sup>Optional</sup> <a name="defaultReleaseBranch" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.defaultReleaseBranch"></a>

```typescript
public readonly defaultReleaseBranch: string;
```

- *Type:* string
- *Default:* "main"

The name of the main release branch.

---

##### `dependabot`<sup>Optional</sup> <a name="dependabot" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.dependabot"></a>

```typescript
public readonly dependabot: boolean;
```

- *Type:* boolean
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### `dependabotOptions`<sup>Optional</sup> <a name="dependabotOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.dependabotOptions"></a>

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* projen.github.DependabotOptions
- *Default:* default options

Options for dependabot.

---

##### `depsUpgrade`<sup>Optional</sup> <a name="depsUpgrade" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.depsUpgrade"></a>

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* boolean
- *Default:* `true` for root projects, `false` for subprojects

Use tasks and github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### `depsUpgradeOptions`<sup>Optional</sup> <a name="depsUpgradeOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.depsUpgradeOptions"></a>

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* projen.javascript.UpgradeDependenciesOptions
- *Default:* default options

Options for `UpgradeDependencies`.

---

##### `gitignore`<sup>Optional</sup> <a name="gitignore" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.gitignore"></a>

```typescript
public readonly gitignore: string[];
```

- *Type:* string[]

Additional entries to .gitignore.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.jest"></a>

```typescript
public readonly jest: boolean;
```

- *Type:* boolean
- *Default:* true

Setup jest unit tests.

---

##### `jestOptions`<sup>Optional</sup> <a name="jestOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.jestOptions"></a>

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* projen.javascript.JestOptions
- *Default:* default options

Jest options.

---

##### `npmignoreEnabled`<sup>Optional</sup> <a name="npmignoreEnabled" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmignoreEnabled"></a>

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### `npmIgnoreOptions`<sup>Optional</sup> <a name="npmIgnoreOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.npmIgnoreOptions"></a>

```typescript
public readonly npmIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .npmignore file.

---

##### `package`<sup>Optional</sup> <a name="package" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.prettier"></a>

```typescript
public readonly prettier: boolean;
```

- *Type:* boolean
- *Default:* false

Setup prettier.

---

##### `prettierOptions`<sup>Optional</sup> <a name="prettierOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.prettierOptions"></a>

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* projen.javascript.PrettierOptions
- *Default:* default options

Prettier options.

---

##### `projenDevDependency`<sup>Optional</sup> <a name="projenDevDependency" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenDevDependency"></a>

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Indicates of "projen" should be installed as a devDependency.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projenrcJs" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projenrcJsOptions" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenrcJsOptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options for .projenrc.js.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="pullRequestTemplate" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pullRequestTemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Include a GitHub pull request template.

---

##### `pullRequestTemplateContents`<sup>Optional</sup> <a name="pullRequestTemplateContents" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.pullRequestTemplateContents"></a>

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* string[]
- *Default:* default content

The contents of the pull request template.

---

##### `release`<sup>Optional</sup> <a name="release" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.release"></a>

```typescript
public readonly release: boolean;
```

- *Type:* boolean
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### `releaseToNpm`<sup>Optional</sup> <a name="releaseToNpm" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.releaseToNpm"></a>

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* boolean
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### `workflowBootstrapSteps`<sup>Optional</sup> <a name="workflowBootstrapSteps" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowBootstrapSteps"></a>

```typescript
public readonly workflowBootstrapSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### `workflowGitIdentity`<sup>Optional</sup> <a name="workflowGitIdentity" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowGitIdentity"></a>

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* projen.github.GitIdentity
- *Default:* default GitHub Actions user

The git identity to use in workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* `minNodeVersion` if set, otherwise `lts/*`.

The node version used in GitHub Actions workflows.

Always use this option if your GitHub Actions workflows require a specific to run.

---

##### `workflowPackageCache`<sup>Optional</sup> <a name="workflowPackageCache" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.workflowPackageCache"></a>

```typescript
public readonly workflowPackageCache: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Node.js package cache in GitHub workflows.

---

##### `company`<sup>Required</sup> <a name="company" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.company"></a>

```typescript
public readonly company: string;
```

- *Type:* string

The owning company slug — used as the npm scope (e.g. `rocketleap`).

---

##### `project`<sup>Required</sup> <a name="project" id="@rocketleap/rocketleap-projen.RocketleapPlatformMinimalProjectOptions.property.project"></a>

```typescript
public readonly project: string;
```

- *Type:* string

The project slug — used as the package name suffix (e.g. `aws-nuke-templates`).

---



