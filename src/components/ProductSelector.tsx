import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function ProductSelector({
    allProducts,
    selectedProducts,
    setSelectedProducts,
}: {
    allProducts: string[];
    selectedProducts: string[];
    setSelectedProducts: (products: string[]) => void;
}) {
    const toggleProduct = (product: string) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter((p) => p !== product));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    return (
        <div className="space-y-2">
            <Popover>
                <PopoverTrigger className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                    + Selecionar produtos
                </PopoverTrigger>
                <PopoverContent className="w-60 p-0">
                    <Command>
                        <CommandInput placeholder="Buscar produto..." />
                        <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
                        <CommandGroup>
                            {allProducts.map((product) => (
                                <CommandItem
                                    key={product}
                                    onSelect={() => toggleProduct(product)}
                                >
                                    {selectedProducts.includes(product) ? "✓ " : ""}{product}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2">
                {selectedProducts.map((product) => (
                    <Badge key={product} className="flex items-center gap-1">
                        {product}
                        <X
                            size={14}
                            className="cursor-pointer"
                            onClick={() =>
                                setSelectedProducts(selectedProducts.filter((p) => p !== product))
                            }
                        />
                    </Badge>
                ))}
            </div>
        </div>
    );
}
