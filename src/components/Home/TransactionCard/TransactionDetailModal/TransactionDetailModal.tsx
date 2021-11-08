import { FC } from "react";
import { useTranslation } from "react-i18next";
import ModalDialog from "../../../../container/ModalDialog/ModalDialog";
import { Transaction } from "../../../../models/transaction.model";
import LNDetails from "./LNDetails/LNDetails";
import OnchainDetails from "./OnchainDetails/OnchainDetails";

export const TransactionDetailModal: FC<TransactionDetailModalProps> = (
  props
) => {
  const { t } = useTranslation();

  const { transaction } = props;

  return (
    <ModalDialog close={props.close}>
      <section className="flex flex-col">
        <div className="font-extrabold">{t("tx.tx_details")}</div>
        {transaction.category === "onchain" && (
          <a
            className="text-blue-400 underline break-all py-2"
            target="_blank"
            rel="noreferrer"
            href={`https://mempool.space/tx/${transaction.id}`}
          >
            {t("tx.mempool")}
          </a>
        )}
        {transaction.category === "onchain" && (
          <OnchainDetails details={transaction} />
        )}
        {transaction.category === "ln" && <LNDetails details={transaction} />}
      </section>
    </ModalDialog>
  );
};

export default TransactionDetailModal;

export interface TransactionDetailModalProps {
  transaction: Transaction;
  close: () => void;
}
