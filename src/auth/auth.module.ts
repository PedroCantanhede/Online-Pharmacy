import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Aqui entrará a variável de ambiente par aarmanezar a chave secreta
      signOptions: { expiresIn: '60m' },
    }),
    UserModule, 
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
