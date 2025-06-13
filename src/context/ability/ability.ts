import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability';
import type { IUser } from '../../types/user.interfaces';
import { RolesEnum } from '../../types/roles.enum';
import { ActionsEnum } from '../../types/actions.enum';
import { SubjectsEnum } from '../../types/subjects.enum';

export type Actions = ActionsEnum;
export type Subjects = SubjectsEnum;

export type AppAbility = MongoAbility<[Actions, Subjects]>;
export type AppAbilityClass = typeof createMongoAbility;

export function defineAbilityFor(user?: IUser | null) {
  const { can, build } = new AbilityBuilder<MongoAbility<[Actions, Subjects]>>(createMongoAbility);
  if (!user) {
    return build();
  }

  // Ejemplo: reglas según el rol
  if (user.role === RolesEnum.ADMIN) {
    can(ActionsEnum.manage, SubjectsEnum.all);
  } else if (user.role === RolesEnum.USER) {
    can(ActionsEnum.read, SubjectsEnum.Dashboard);
  } else {
    // Invitado
    can(ActionsEnum.read, SubjectsEnum.Dashboard);
  }

  return build();
}
