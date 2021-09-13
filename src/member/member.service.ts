import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCredentialsDto } from './dto/member-credential.dto';
import { MemberSignInDto } from './dto/member-signIn.dto';
import { MemberRepository } from './member.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository:MemberRepository,
        private jwtService : JwtService
    ){}

    async signUp(memberCredentialsDto : MemberCredentialsDto) : Promise<void> {
        return this.memberRepository.createMember(memberCredentialsDto);
    }

    async signIn(memberSignInDto : MemberSignInDto) : Promise<{accessToken:string}> {
        const { memberId, memberPw } = memberSignInDto;
        const member = await this.memberRepository.findOne({memberId});

        if(member && (await bcrypt.compare(memberPw, member.memberPw))) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { memberId }; //토큰에 중요한 정보 넣지 말기
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken:accessToken }; //객체로 리턴
        }  else {
            throw new UnauthorizedException('로그인 정보가 일치하지 않습니다.')
        }
    }
}
