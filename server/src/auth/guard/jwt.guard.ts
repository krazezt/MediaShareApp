import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

// For clean code, I'll use the ConfigModule to get the "Key"
// - Krazezt -
export class JwtGuard extends AuthGuard(
  new ConfigService().get('AUTH_GUARD_STRATEGY'),
) {
  constructor() {
    super();
  }
}
