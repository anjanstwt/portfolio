import type { ComponentType } from "react";
import type { IslandState, ViewProps } from "../../../types/island.type";
import AirdropMiniView from "./AirdropMiniView";
import ContactView from "./ContactView";
import ExperienceView from "./ExperienceView";
import NavbarView from "./NavbarView";
import ProjectView from "./ProjectView";
import AirdropView from "./AirdropView";
import FindMyView from "./FindMyView";
import IdleView from "./IdleView";
import LowBatteryView from "./LowBatteryView";
import MusicView from "./MusicView";
import PhoneView from "./PhoneView";
import RecordView from "./RecordView";
import RingView from "./RingView";
import ScreenRecordView from "./ScreenRecordView";
import TimerView from "./TimerView";

export const views: Record<IslandState, ComponentType<ViewProps>> = {
    navbar: NavbarView,
    project: ProjectView,
    experience: ExperienceView,
    contact: ContactView,
    idle: IdleView,
    ring: RingView,
    timer: TimerView,
    record: RecordView,
    music: MusicView,
    airdrop: AirdropView,
    airdropMini: AirdropMiniView,
    lowBattery: LowBatteryView,
    phone: PhoneView,
    findmy: FindMyView,
    screenRecord: ScreenRecordView,
};
