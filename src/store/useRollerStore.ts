import create from "zustand";
import { PendingTransaction } from "@urbit/roller-api";

import { HOUR } from "../lib/roller";
import Point, { Points } from "../types/Point";
import { toL1Details } from "../lib/utils/point";
import { PendingL1, PendingL1Txn } from "../types/PendingL1Transaction";

const getPointsAndList = (points: Points, point: Point) => ({
  points,
  pointList: Object.values(points).sort((a, b) => a.value - b.value),
  point: point.isDefault ? point : points[point.value],
});

export const EMPTY_POINT = new Point({
  value: -1,
  details: toL1Details({}),
  address: "",
});

export interface RollerState {
  loading: boolean;
  nextQuotaTime: number;
  pendingTransactions: PendingTransaction[];
  point: Point;
  points: Points;
  pointList: Point[];
  pendingL1ByPoint: PendingL1;
  modalText?: string;
  recentlyCompleted: number;
}

export interface RollerActions {
  setLoading: (loading: boolean) => void;
  setModalText: (modalText: string) => void;
  setNextQuotaTime: (nextQuotaTime: number) => void;
  setPendingTransactions: (pendingTransactions: PendingTransaction[]) => void;
  setPoint: (point: number) => void;
  setPoints: (points: Points) => void;
  updatePoint: (point: Point) => void;
  storePendingL1Txn: (txn: PendingL1Txn) => void;
  deletePendingL1Txn: (txn: PendingL1Txn) => void;
  resetStore: () => void;
}

const initialRollerState: RollerState = {
  loading: false,
  nextQuotaTime: new Date().getTime() + 24 * HOUR,
  pendingTransactions: [],
  point: EMPTY_POINT,
  pointList: [],
  points: {},
  pendingL1ByPoint: {},
  recentlyCompleted: 0,
};

export const useRollerStore = create<RollerState & RollerActions>((set) => ({
  ...initialRollerState,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  setNextQuotaTime: (nextQuotaTime: number) => set(() => ({ nextQuotaTime })),
  setPendingTransactions: (pendingTransactions: PendingTransaction[]) =>
    set((state) => {
      const oldPending = state.pendingTransactions.length;
      if (oldPending > 0 && pendingTransactions.length === 0) {
        return {
          ...state,
          pendingTransactions,
          recentlyCompleted: oldPending,
        };
      }
      return { ...state, pendingTransactions };
    }),
  setPoint: (point: number) =>
    set((state) => ({ point: state.points[point] || EMPTY_POINT })),
  setPoints: (points: Points) =>
    set(({ point }) => getPointsAndList(points, point)),
  updatePoint: (newPoint: Point) =>
    set(({ point, points }) => {
      const newPoints: Points = Object.assign({}, points);
      newPoints[newPoint.value] = newPoint;
      return getPointsAndList(newPoints, point);
    }),
  setModalText: (modalText?: string) => set(() => ({ modalText })),
  storePendingL1Txn: (txn: PendingL1Txn) =>
    set(({ pendingL1ByPoint }) => {
      const newPending = Object.assign({}, pendingL1ByPoint);
      newPending[txn.point] = [...(pendingL1ByPoint[txn.point] || []), txn];
      return { pendingL1ByPoint: newPending };
    }),
  deletePendingL1Txn: (txn: PendingL1Txn) =>
    set(({ pendingL1ByPoint }) => {
      const newPending = Object.assign({}, pendingL1ByPoint);
      newPending[txn.point] =
        pendingL1ByPoint[txn.point]?.filter(({ id }) => id !== txn.id) || [];
      return { pendingL1ByPoint: newPending };
    }),
  resetStore: () => {
    set(initialRollerState);
  },
}));
