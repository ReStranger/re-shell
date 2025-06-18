import { Accessor } from "ags";

export class Variable<T> extends Accessor<T> {
  #subscribers = new Set<() => void>();
  #value: T;

  constructor(init: T) {
    super(
      () => this.#value,
      (callback) => this.#subscribe(callback),
    );

    this.#value = init;
  }

  #subscribe(callback: () => void): () => void {
    this.#subscribers.add(callback);
    return () => this.#subscribers.delete(callback);
  }

  set(value: T) {
    if (this.#value !== value) {
      this.#value = value;
      this.#subscribers.forEach((cb) => cb());
    }
  }
}
