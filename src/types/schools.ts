export interface SchoolType {
    id: number;
    regionId: number;
    regionNameTranslation: RegionNameTranslation;
    districtId: number;
    districtNameTranslation: DistrictNameTranslation;
    schoolNameTranslation: SchoolNameTranslation;
    isActive: boolean;
    amountOfPendingChanges: number;
  }
  interface SchoolNameTranslation {
    nameTranslation: NameTranslation3;
  }
  interface NameTranslation3 {
    id: number;
    textValueKaz: string;
    textValueEng?: any;
    textValueRu?: any;
  }
  interface DistrictNameTranslation {
    nameTranslation: NameTranslation2;
  }
  interface NameTranslation2 {
    id: number;
    textValueEng: string;
    textValueKaz?: any;
    textValueRu?: any;
    textValueKazLat?: any;
  }
  interface RegionNameTranslation {
    nameTranslation: NameTranslation;
  }
  interface NameTranslation {
    id: number;
    textValueEng: string;
    textValueKaz: string;
    textValueRu: string;
    textValueKazLat: string;
  }