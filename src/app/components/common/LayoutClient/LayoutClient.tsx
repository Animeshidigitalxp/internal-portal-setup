"use client"
import { useEffect } from "react";

export default function LayoutClient() {
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
            const checkbox = document.getElementById("sidebarToggle") as HTMLInputElement;
            if (!checkbox) return;

            if (window.innerWidth > 1024) return;

            const isSidebarOpen =
                window.innerWidth <= 992
                    ? checkbox.checked
                    : !checkbox.checked;

            if (!isSidebarOpen) return;

            const target = e.target as Node;
            const sidebar = document.querySelector(".sidebarEat");
            const menuLabel = document.querySelector('label[for="sidebarToggle"]');

            if (sidebar?.contains(target) || menuLabel?.contains(target)) return;

            if (window.innerWidth <= 992) {
                checkbox.checked = false;
            } else {
                checkbox.checked = true;
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchend", handleOutsideClick as EventListener);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchend", handleOutsideClick as EventListener);
        };
    }, []);

    return null; // ✅ renders nothing, touches no DOM structure
}