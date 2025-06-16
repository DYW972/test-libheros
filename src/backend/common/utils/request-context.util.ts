import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  getClientContext(): { ip: string; userAgent: string } {
    const ip = this.request.ip || '';
    const userAgent = this.request.headers['user-agent'] ?? 'Unknown';
    return { ip, userAgent };
  }
}
