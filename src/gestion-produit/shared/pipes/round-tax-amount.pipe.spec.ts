
import {RoundTaxAmountPipe} from "./round-tax-amount.pipe";

describe('RoundTaxAmountPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new RoundTaxAmountPipe();

  it('transforms "0.99" to "1"', () => {
    expect(pipe.transform(0.99)).toBe(1);
  });

  it('transforms "1.01 def" to "1.05"', () => {
    expect(pipe.transform(1.01)).toBe(1.05);
  });

  it('transforms "1.06 def" to "1.1"', () => {
    expect(pipe.transform(1.06)).toBe(1.1);
  });

});

