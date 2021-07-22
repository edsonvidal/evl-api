import { EntityRepository, Repository } from 'typeorm';
import Filial from '../entities/MillenniumFiliais';

@EntityRepository(Filial)
class MillenniumFiliaisRepository extends Repository<Filial> {
  public async findByName(name: string): Promise<Filial | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<Filial | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<Filial | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default MillenniumFiliaisRepository;
