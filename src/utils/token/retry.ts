export class RetryManager {
  private count: number = 0;
  
  reset() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }

  getCount() {
    return this.count;
  }

  calculateDelay(baseDelay: number): number {
    return baseDelay * Math.pow(2, this.count - 1);
  }
}