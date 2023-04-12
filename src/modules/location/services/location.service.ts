import { Injectable } from '@nestjs/common';
import { waitForDebugger } from 'inspector';
import { EntityManager } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(private manager: EntityManager) {}

  async getProvinces() {
    const result = await this.manager
      .createQueryBuilder()
      .select()
      .from('province', null)
      .getRawMany();
    return result;
  }

  async getDistrict(provinceId) {
    const result = await this.manager
      .createQueryBuilder()
      .select(['dis.*'])
      .from('district', 'dis')
      .innerJoin('province', 'pro')
      .where('dis._province_id = :provinceId', { provinceId })
      .andWhere('pro.id = :provinceId', { provinceId })
      .getRawMany();
    return result;
  }

  async getWard(districtId) {
    const result = await this.manager
      .createQueryBuilder()
      .select(['wad.*'])
      .from('ward', 'wad')
      .innerJoin('district', 'dis')
      .where('wad._district_id  = :districtId', { districtId })
      .andWhere('dis.id = :districtId', { districtId })
      .getRawMany();
    return result;
  }

  async getAllDistrict() {
    const result = await this.manager
      .createQueryBuilder()
      .select(['dis.*'])
      .from('district', 'dis')
      .getRawMany();
    return result;
  }

  async getAllWard() {
    const result = await this.manager
      .createQueryBuilder()
      .select(['wad.*'])
      .from('ward', 'wad')
      .getRawMany();
    return result;
  }
}
