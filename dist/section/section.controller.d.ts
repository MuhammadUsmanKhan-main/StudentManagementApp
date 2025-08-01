import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/createSection.dto";
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
    createSection(createSectionDto: CreateSectionDto): Promise<{
        message: string;
    }>;
}
