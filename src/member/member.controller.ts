import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { MemberCredentialsDto } from './dto/member-credential.dto';
import { MemberSignInDto } from './dto/member-signIn.dto';
import { MemberUpdateDto } from './dto/member-update.dto'
import { MemberService } from './member.service';
import { Member } from './member.entity';

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

    @Get('/list')
    getAllMember(): Promise<Member[]> {
        return this.memberService.getAllMember();
    }

    @Delete('/:no')
    deleteMember(@Param('no', ParseIntPipe) no:number): Promise<void> {
        return this.memberService.deleteMember(no);
    }

    @Get('/:no') 
    getMemberByNo(@Param('no') no:number):Promise<Member> {
        return this.memberService.getMemberByNo(no);
    }

    @Patch('/:no/update')
    updateMember(
        @Param('no', ParseIntPipe) no:number,
        @Body(ValidationPipe) memberUpdateDto : MemberUpdateDto,
        @GetUser() user:User): Promise<Member> {
            return this.memberService.updateMember(no,memberUpdateDto);
        }
}
