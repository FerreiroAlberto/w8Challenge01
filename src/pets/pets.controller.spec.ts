import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { UsersService } from 'src/users/users.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet.entity';
import { Role } from '@prisma/client';

describe('PetsController', () => {
  let controller: PetsController;
  let mockPetsService: jest.Mocked<PetsService>;
  let mockUsersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    // mockPetsService = {
    //   create: jest.fn(),
    //   findAll: jest.fn(),
    //   findOne: jest.fn(),
    //   update: jest.fn(),
    //   remove: jest.fn(),
    // };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        { provide: PetsService, useValue: mockPetsService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should return the created pet', async () => {
      const petDto: CreatePetDto = {
        name: 'Buddy',
        species: 'Dog',
        age: 5,
        userId: '',
      };
      const expectedPet = { id: '1', ...petDto };
      mockPetsService.create.mockResolvedValue(expectedPet);

      expect(await controller.create(petDto)).toEqual(expectedPet);
      expect(mockPetsService.create).toHaveBeenCalledWith(petDto);
    });
  });
  describe('findAll', () => {
    it('should return an array of pets', async () => {
      const expectedPets: Pet[] = [
        {
          id: '1',
          name: 'Buddy',
          species: 'Dog',
          age: 5,
          user: {
            id: 'userId1',
            email: 'user@example.com',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
      mockPetsService.findAll.mockResolvedValue(expectedPets);

      expect(await controller.findAll()).toEqual(expectedPets);
      expect(mockPetsService.findAll).toHaveBeenCalled();
    });
  });
  // describe('findOne', () => {
  //   it('should return a single pet', async () => {
  //     const expectedPet = {
  //       id: '1',
  //       name: 'Buddy',
  //       species: 'Dog',
  //       age: 5,
  //       userId: '',
  //     };
  //     mockPetsService.findOne.mockResolvedValue(expectedPet);

  //     expect(await controller.findOne('1')).toEqual(expectedPet);
  //     expect(mockPetsService.findOne).toHaveBeenCalledWith('1');
  //   });
  // });
  // describe('update', () => {
  //   it('should update and return the pet', async () => {
  //     const petUpdateDto: UpdatePetDto = {
  //       name: 'Buddy New',
  //       species: 'Dog',
  //       age: 6,
  //     };
  //     const updatedPet = { id: '1', ...petUpdateDto };
  //     mockPetsService.update.mockResolvedValue(updatedPet);

  //     expect(await controller.update('1', petUpdateDto)).toEqual(updatedPet);
  //     expect(mockPetsService.update).toHaveBeenCalledWith('1', petUpdateDto);
  //   });
  // });

  describe('remove', () => {
    it('should remove the pet', async () => {
      const expectedPet = {
        id: '1',
        name: 'Buddy',
        species: 'Dog',
        age: 5,
        user: {
          id: 'userId1',
          email: 'user@example.com',
          role: Role.user,
        },
      };
      mockPetsService.remove.mockResolvedValue(expectedPet);

      expect(await controller.remove('1')).toEqual(expectedPet);
      expect(mockPetsService.remove).toHaveBeenCalledWith('1');
    });
  });
});
