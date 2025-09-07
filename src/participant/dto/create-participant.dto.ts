import { ApiProperty} from "@nestjs/swagger";

export class CreateParticipantDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;
}
