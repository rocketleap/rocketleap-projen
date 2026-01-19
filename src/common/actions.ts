/**
 * GitHub Actions configuration for Rocketleap projects
 */
export const ACTIONS_CONFIGURATION = {
  /**
   * Common workflow bootstrap steps for GitHub Actions
   */
  workflowBootstrapSteps: [
    {
      name: 'Enable Corepack',
      run: 'corepack enable',
    },
  ],

  /**
   * Pre-publish steps for npm releases
   */
  npmPrePublishSteps: [
    {
      name: 'Enable Corepack',
      run: 'corepack enable',
    },
    {
      name: 'Checkout',
      uses: 'actions/checkout@v5',
      with: {
        path: '.repo',
      },
    },
    {
      name: 'Install Dependencies',
      run: 'cd .repo && yarn install --immutable',
    },
    {
      name: 'Extract build artifact',
      run: 'tar --strip-components=1 -xzvf dist/js/*.tgz -C .repo',
    },
    {
      name: 'Move build artifact out of the way',
      run: 'mv dist dist.old',
    },
    {
      name: 'Create js artifact',
      run: 'cd .repo && npx projen package:js',
    },
    {
      name: 'Collect js artifact',
      run: 'mv .repo/dist dist',
    },
  ],
};
