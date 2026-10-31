import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBallparkRoofCost, formatCurrency } from './calculator';

test('calculates ballpark estimate for standard 2000 sqft home with architectural shingles', () => {
  const result = calculateBallparkRoofCost({
    squareFootage: 2000,
    pitch: 'moderate',
    stories: 1,
    materialId: 'arch_shingle',
    includeTearOff: true,
  });

  // 2000 * 1.22 * 1.10 = 2684 sqft -> approx 26.8 squares
  assert.ok(result.estimatedSquares > 25 && result.estimatedSquares < 28);
  assert.ok(result.lowEstimate > 10000 && result.lowEstimate < 20000);
  assert.ok(result.highEstimate > result.lowEstimate);
  assert.ok(result.breakdown.tearOffAndDisposal > 0);
});

test('steep pitch increases estimated squares and costs relative to low pitch', () => {
  const lowPitch = calculateBallparkRoofCost({
    squareFootage: 2500,
    pitch: 'low',
    stories: 2,
    materialId: 'standing_seam',
    includeTearOff: false,
  });

  const steepPitch = calculateBallparkRoofCost({
    squareFootage: 2500,
    pitch: 'steep',
    stories: 2,
    materialId: 'standing_seam',
    includeTearOff: false,
  });

  assert.ok(steepPitch.estimatedSquares > lowPitch.estimatedSquares);
  assert.ok(steepPitch.lowEstimate > lowPitch.lowEstimate);
  assert.equal(lowPitch.breakdown.tearOffAndDisposal, 0);
});

test('story multiplier scales labor costs for 3-story home', () => {
  const oneStory = calculateBallparkRoofCost({
    squareFootage: 1800,
    pitch: 'moderate',
    stories: 1,
    materialId: 'arch_shingle',
    includeTearOff: false,
  });

  const threeStory = calculateBallparkRoofCost({
    squareFootage: 1800,
    pitch: 'moderate',
    stories: 3,
    materialId: 'arch_shingle',
    includeTearOff: false,
  });

  // Same roof area, but higher labor cost on 3 stories
  assert.equal(oneStory.estimatedSquares, threeStory.estimatedSquares);
  assert.ok(threeStory.lowEstimate > oneStory.lowEstimate);
});

test('formatCurrency outputs correctly formatted USD string', () => {
  assert.equal(formatCurrency(15400), '$15,400');
  assert.equal(formatCurrency(0), '$0');
});
