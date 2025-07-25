import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ShgAuthService } from './shg-auth.service';
import { createMemberDto } from './dto/create-member.dto';
import { LoginDto } from './dto/login-member.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '@app/db/enums/user-role.enum';
import { RolesGuard } from './guards/roles-guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminLoginDto } from './dto/login-admin.dto';

@Controller('auth')
export class ShgAuthController {
  constructor(private authService: ShgAuthService) {}

  @Post('create-member')
  register(@Body() createMemberDto: createMemberDto) {
    return this.authService.createMember(createMemberDto);
  }
  @Post('login/member')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginMember(loginDto);
  }
  @Post('login/admin')
  loginAdmin(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto);
  }
  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }
  @Post('create-admin')
  @Roles(UserRole.NIC_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }
}
