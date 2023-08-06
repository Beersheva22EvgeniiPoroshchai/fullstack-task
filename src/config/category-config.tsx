import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { AppartementForm } from "../components/forms/AppartementForm";
import { AutoForm } from "../components/forms/AutoForm";
import { EquipmentForm } from "../components/forms/EquipmentForm";
import Advert from "../model/Advert";
import InputResult from "../model/InputResult";
import {advertsService} from "../config/service-config"

export const categoryConfig: Map<string, ReactNode> = new Map (
    [
      ["appartement", <AppartementForm submitFn={advertsService.addAdvert.bind(advertsService)}></AppartementForm>],
      ["auto", <AutoForm submitFn={advertsService.addAdvert.bind(advertsService)}></AutoForm>],
      ["equipment", <EquipmentForm submitFn={advertsService.addAdvert.bind(advertsService)}></EquipmentForm>],
    ]
  )


