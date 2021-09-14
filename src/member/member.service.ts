import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCredentialsDto } from './dto/member-credential.dto';
import { MemberSignInDto } from './dto/member-signIn.dto';
import { MemberRepository } from './member.repository';
import * as bcrypt from 'bcryptjs';
import { Member } from './member.entity';
import { MemberUpdateDto } from './dto/member-update.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository:MemberRepository,
        private jwtService : JwtService
    ){}


    //회원가입
    async signUp(memberCredentialsDto : MemberCredentialsDto) : Promise<void> {
        return this.memberRepository.createMember(memberCredentialsDto);
    }

    //로그인
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

    //회원 리스트
    async getAllMember():Promise <Member[]> {
        return this.memberRepository.find({
            select: ["memberNo", "memberName", "memberAddress", "memberPhone"]
        });
    }

    //회원 삭제
    async deleteMember(memberNo:number) : Promise<void> {
        const result = await this.memberRepository.delete(memberNo);
    }

    //회원 단일 조회
    async getMemberByNo(memberNo:number) : Promise<Member>{
        const found = await this.memberRepository.findOne(memberNo);

        if(!found) {
            throw new NotFoundException(`회원 정보를 찾을 수 없습니다.`)
        }

        return found;
    }

    //회원정보수정
    async updateMember(memberNo, memberUpdateDto : MemberUpdateDto):Promise<Member> {
        const member = await this.getMemberByNo(memberNo);

        const {             
            memberPw, 
            memberName,
            memberAddress, 
            memberPhone } = memberUpdateDto;

        
        member.memberPw = memberPw;
        member.memberName = memberName;
        member.memberAddress = memberAddress;
        member.memberPhone = memberPhone;

        await this.memberRepository.save(member);

        return member;
        
    }
}
