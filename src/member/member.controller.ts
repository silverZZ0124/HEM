import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MemberCredentialsDto } from './dto/member-credential.dto';
import { MemberSignInDto } from './dto/member-signIn.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
    constructor(
        private memberService : MemberService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) memberCredentialsDto : MemberCredentialsDto):Promise<void> {
        return this.memberService.signUp(memberCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) memberSignInDto : MemberSignInDto): Promise<{accessToken: string}>  {
        return this.memberService.signIn(memberSignInDto);
    }
}
