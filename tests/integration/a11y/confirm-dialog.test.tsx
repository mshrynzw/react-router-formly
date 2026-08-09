import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";

describe("ConfirmDialog accessibility", () => {
  it("traps focus inside the dialog and restores it on close", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    function Harness({ open }: { open: boolean }) {
      return (
        <>
          <button type="button">Trigger</button>
          <ConfirmDialog
            open={open}
            title="確認"
            description="説明"
            confirmLabel="実行"
            cancelLabel="キャンセル"
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </>
      );
    }

    const view = render(<Harness open={false} />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();
    expect(trigger).toHaveFocus();

    view.rerender(<Harness open />);

    const cancel = screen.getByRole("button", { name: "キャンセル" });
    expect(cancel).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "実行" })).toHaveFocus();
    await user.tab();
    expect(cancel).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalledTimes(1);

    view.rerender(<Harness open={false} />);
    expect(trigger).toHaveFocus();
  });
});
