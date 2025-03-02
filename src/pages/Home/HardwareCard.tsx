import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SSEContext } from "../../context/sse-context";
import LoadingBox from "../../components/LoadingBox";

const PI_NUM_CORES = 4;

export const HardwareCard: FC = () => {
  const { t } = useTranslation();
  const { hardwareInfo } = useContext(SSEContext);

  if (!hardwareInfo) {
    return (
      <div className="h-full w-1/2">
        <LoadingBox />
      </div>
    );
  }

  const {
    cpu_overall_percent: cpuOverallPercent,
    temperatures_celsius: temperaturesCelsius,
    vram_usage_percent: vramUsagePercent,
    disks,
  } = hardwareInfo;

  const systemTemp = temperaturesCelsius.system_temp?.toFixed(2);

  const cpuPercent = ((cpuOverallPercent / PI_NUM_CORES) * 100).toFixed(2);

  const mainHDD = disks.find((disk) => disk.device === "/");

  // byte => gigabyte converstion
  const hddUsedGB = mainHDD?.partition_used_bytes
    ? (mainHDD.partition_used_bytes / 1024 / 1024 / 1024).toFixed(2)
    : "-";

  const hddFreeGB = mainHDD?.partition_total_bytes
    ? (mainHDD.partition_total_bytes / 1024 / 1024 / 1024).toFixed(2)
    : "-";

  let hddUsedPercent: string = "-";

  if (!isNaN(+hddUsedGB) && !isNaN(+hddFreeGB)) {
    hddUsedPercent = ((+hddUsedGB / +hddFreeGB) * 100).toFixed(2);
  }

  return (
    <div className="bd-card mt-8 w-full transition-colors lg:mt-0 lg:ml-2 lg:w-1/2">
      <div className="flex items-center text-lg font-bold">
        {t("hardware.header")}
      </div>
      <article className="flex flex-row overflow-hidden py-4">
        <div className="flex w-1/2 flex-col">
          <h6 className="text-sm text-gray-500 dark:text-gray-200">
            {t("hardware.cpu_load")}
          </h6>
          <div className="flex">{cpuPercent} %</div>
        </div>
        <div className="flex w-1/2 flex-col">
          <h6 className="text-sm text-gray-500 dark:text-gray-200">
            {t("hardware.temp")}
          </h6>
          <div className="flex">{systemTemp} °C</div>
        </div>
      </article>
      <article className="flex flex-row overflow-hidden py-4">
        <div className="flex w-1/2 flex-col">
          <h6 className="text-sm text-gray-500 dark:text-gray-200">
            {t("hardware.ram_usage")}
          </h6>
          <div className="flex">{vramUsagePercent} %</div>
        </div>
        <div className="flex w-1/2 flex-col">
          <h6 className="text-sm text-gray-500 dark:text-gray-200">
            {t("hardware.disk_usage")}
          </h6>
          <div className="flex">
            {hddUsedGB} / {hddFreeGB} GB ({hddUsedPercent} %)
          </div>
        </div>
      </article>
    </div>
  );
};

export default HardwareCard;
