import type { Request } from "express";
import type { ParticipantMetadata } from "src/participant/dto/participant-metadata.dto";

export interface RequestWithParticipant extends Request {
  participant?: ParticipantMetadata;
}
