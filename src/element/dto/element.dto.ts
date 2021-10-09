import { ContornoDefinitionDto } from './ContornoAndDefinition.dto';
import { ExampleDto } from './Example.dto';
import { GeneralDescriptionDto } from './GeneralDescription.dto';
import { OrderLemmaDto } from './OrderLemma.dto';
import { ParadigmaticInfoDto } from './ParadigmaticInfo.dto';
import { UseInformationDto } from './UseInformation.dto';
import { ClasificationDto } from 'src/clasification/dto/clasification.dto';
import { UbicationDto } from 'src/ubication/dto/ubication.dto';

export class ElementDescriptorsAsStringDto {
  id?: string;
  element: string;
  clasification: string;
  ubication: string;
  generalDescription: GeneralDescriptionDto;
  orderLemma: OrderLemmaDto;
  useInformation: UseInformationDto[];
  contornoDefinition: ContornoDefinitionDto[];
  example: ExampleDto;
  paradigmaticInfo: ParadigmaticInfoDto;
}
