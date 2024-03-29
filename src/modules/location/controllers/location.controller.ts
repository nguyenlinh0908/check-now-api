import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocationService } from '../services';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  
  constructor(private locationService: LocationService) {}

  @ApiOkResponse({ description: 'province list successfully' })
  @Get('provinces')
  provinces() {
    return this.locationService.getProvinces();
  }

  @ApiQuery({ name: 'province', type: String })
  @ApiOkResponse({ description: 'district list successfully.' })
  @Get('district')
  district(@Query('province') provinceId) {
    return this.locationService.getDistrict(provinceId);
  }

  @ApiQuery({ name: 'district', type: String })
  @ApiOkResponse({ description: 'Ward list successfully.' })
  @Get('ward')
  streets(@Query('district') districtId) {
    return this.locationService.getWard(districtId);
  }

  @Get('districts')
  getAllDistrict() {
    return this.locationService.getAllDistrict();
  }

  @Get('wards')
  getAllWards() {
    return this.locationService.getAllWard();
  }
}
