import { Injectable } from '@nestjs/common';
import { PolicyHandler } from '../interfaces/policy-handler.interface';

@Injectable()
export class PolicyHandlerRegistry {
  private readonly handlers = new Map<string, PolicyHandler>();

  register(name: string, handler: PolicyHandler) {
    if (this.handlers.has(name)) {
      throw new Error(`Policy "${name}" is already registered`);
    }
    this.handlers.set(name, handler);
  }

  get(name: string): PolicyHandler {
    const handler = this.handlers.get(name);
    if (!handler) throw new Error(`No handler found for policy "${name}"`);
    return handler;
  }
}
