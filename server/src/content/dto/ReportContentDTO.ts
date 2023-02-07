import { ReportStatus } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateReportDTO {
  @IsNumber()
  @IsNotEmpty()
  contentId: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

class UpdateReportDTO {
  @IsNumber()
  @IsNotEmpty()
  reportId: number;

  @IsNotEmpty()
  status: ReportStatus;
}

export { CreateReportDTO, UpdateReportDTO };
