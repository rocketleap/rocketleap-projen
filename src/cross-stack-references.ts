/**
 * Controls the CDK `@aws-cdk/core:defaultCrossStackReferences` context flag.
 *
 * Determines how cross-stack references are materialised in synthesized
 * CloudFormation templates.
 */
export enum CrossStackReferences {
  /**
   * Use CloudFormation exports (`Fn::ImportValue`) for cross-stack references.
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
