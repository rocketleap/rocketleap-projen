/**
 * Controls the CDK `@aws-cdk/core:defaultCrossStackReferences` context flag.
 *
 * Determines how cross-stack references are materialised in synthesized
 * CloudFormation templates. Switching an existing deployment between strong and
 * weak changes the rendered references and can replace resources whose
 * referencing property is immutable, so change it only with a reviewed cdk diff.
 */
export enum CrossStackReferences {
  /**
   * Use CloudFormation exports (`Fn::ImportValue`) for cross-stack references. This is the default.
   */
  STRONG = 'strong',
  /**
   * Use `Fn::GetStackOutput` for cross-stack references.
   */
  WEAK = 'weak',
  /**
   * Emit both strong and weak references.
   */
  BOTH = 'both',
}
