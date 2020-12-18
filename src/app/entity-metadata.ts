import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  User: {},
};

// const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  // pluralNames
};
