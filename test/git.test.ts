import { gitIgnore } from '../src/common/git';

describe('gitIgnore', () => {
  test('returns the Rocketleap defaults when no user patterns are supplied', () => {
    const result = gitIgnore();
    expect(result).toContain('cdk.out');
    expect(result).toContain('.claude/');
  });

  test('user patterns come first and are deduped against defaults', () => {
    const result = gitIgnore(['.venv/', 'cdk.out']);
    expect(result[0]).toBe('.venv/');
    expect(result.filter((p) => p === 'cdk.out')).toHaveLength(1);
  });
});
