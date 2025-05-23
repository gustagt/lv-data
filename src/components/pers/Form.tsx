"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import stationService from "@/lib/services/station";
import { IStation } from "@/lib/interfaces/Station";
import { useState } from "react";
import Spinner from "../icons/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";


const formSchema = z
  .object({
    computer: z
      .string()
      .min(6, {
        message: "Computador precisa de 6 caracteres.",
      })
      .max(6, {
        message: "Computador precisa de 6 caracteres.",
      })
      .regex(/^\d+$/, {
        message: "Deve conter apenas números.",
      }),
    processor: z.string().min(2, {
      message: "Processador precisa de 2 caracteres.",
    }),
    monitor1: z
      .string()
      .min(6, {
        message: "Monitor 1 precisa de 6 caracteres.",
      })
      .max(6, {
        message: "Monitor 1 precisa de 6 caracteres.",
      })
      .regex(/^\d+$/, {
        message: "Deve conter apenas números.",
      }),
    pol1: z
      .string()
      .min(2, {
        message: "Polegadas do monitor 1 precisa de 2 caracteres.",
      })
      .max(2, {
        message: "Polegadas do monitor 1 precisa de 2 caracteres.",
      })
      .regex(/^\d+$/, {
        message: "Deve conter apenas números.",
      }),
    monitor2: z.string(),
    pol2: z.string(),
    sector: z.string().min(1, { message: "Selecione o setor" }),
    responsible: z
      .string()
      .min(3, {
        message: "Nome invalido.",
      })
      .max(20, {
        message: "Nome Invalido.",
      }),
  })
  .refine(
    (data) => {
      // Se monitor2 foi preenchido, pol2 também deve ser preenchido
      if (data.monitor2 && !data.pol2) {
        return false;
      }
      return true;
    },
    {
      message: "Preencha as polegadas do monitor 2.",
      path: ["pol2"],
    }
  )
  .refine(
    (data) => {
      if (data.monitor2 && !(data.monitor2.length === 6)) {
        return false;
      }
      return true;
    },
    {
      message: "Monitor 2 precisa de 6 caracteres.",
      path: ["monitor2"],
    }
  )
  .refine(
    (data) => {
      if (data.pol2 && !(data.pol2.length === 2)) {
        return false;
      }
      return true;
    },
    {
      message: "Polegadas do Monitor 2 precisa de 2 caracteres.",
      path: ["pol2"],
    }
  )
  .refine(
    (data) => {
      if (data.pol2 && !/^\d+$/.test(data.pol2)) {
        return false;
      }
      return true;
    },
    {
      message: "Deve conter apenas números.",
      path: ["pol2"],
    }
  )
  .refine(
    (data) => {
      if (data.monitor2 && !/^\d+$/.test(data.monitor2)) {
        return false;
      }
      return true;
    },
    {
      message: "Deve conter apenas números.",
      path: ["monitor2"],
    }
  );

export function ProfileForm() {




 
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      computer: "",
      processor: "",
      monitor1: "",
      pol1: "",
      monitor2: "",
      sector: "",
      pol2: "",
      responsible: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const data: IStation = { ...values };
    try {
      const res = await stationService.create(data);
      if (res.status === 201) {
        form.reset();
        toast({
          title: "Concluido!",
          description: "Dados salvos com sucesso!",
          variant: "default",
          duration: 3000,
        });
        setLoading(false);
        return;
      }
    } catch (error: any) {
      if (error.status === 403){
        router.push("/")
        return
      }else if (error.status === 400) {
        toast({
          title: "Erro ao salvar",
          description: error.response.data.error,
          variant: "destructive",
          duration: 3000,
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Erro ao salvar",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao salvar os dados.",
        variant: "destructive",
        duration: 3000,
      });
    }

    setLoading(false);
    return
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full max-w-[600px] flex flex-col "
      >
        <FormField
          control={form.control}
          name="computer"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input placeholder="Computador" {...field} disabled={loading} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="processor"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Processador"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monitor1"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input placeholder="Monitor 1" {...field} disabled={loading} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pol1"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Polegadas - monitor 1"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monitor2"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input placeholder="Monitor 2" {...field} disabled={loading} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pol2"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Polegadas - monitor 2"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    
                    <SelectItem value="Assessoria">Assessoria</SelectItem>
                    <SelectItem value="Assessoria Contábil">
                      Assessoria Contábil
                    </SelectItem>
                    <SelectItem value="Assessoria de Controle Interno">
                      Assessoria de Controle Interno
                    </SelectItem>
                    <SelectItem value="Assessoria de Gestão e Inovação">
                      Assessoria de Gestão e Inovação
                    </SelectItem>
                    <SelectItem value="Assessoria Jurídica">
                      Assessoria Jurídica
                    </SelectItem>
                    <SelectItem value="CICC">CICC</SelectItem>
                    <SelectItem value="Comunicação">Comunicação</SelectItem>
                    <SelectItem value="Diretoria Administrativa Financeira">
                      Diretoria Administrativa Financeira
                    </SelectItem>
                    <SelectItem value="Diretoria de Engenharia de Tráfego">
                      Diretoria de Engenharia de Tráfego
                    </SelectItem>
                    <SelectItem value="Diretoria de Operações e Educação para o Trânsito">
                      Diretoria de Operações e Educação para o Trânsito
                    </SelectItem>
                    <SelectItem value="Diretoria de Planejamento e Pesquisa de Tráfego">
                      Diretoria de Planejamento e Pesquisa de Tráfego
                    </SelectItem>
                    <SelectItem value="Diretoria de Transportes">
                      Diretoria de Transportes
                    </SelectItem>
                    <SelectItem value="Gerência Administrativa">
                      Gerência Administrativa
                    </SelectItem>
                    <SelectItem value="Gerência de Análise e Processamento de Infrações">
                      Gerência de Análise e Processamento de Infrações
                    </SelectItem>
                    <SelectItem value="Gerência de Atendimento Regional">
                      Gerência de Atendimento Regional
                    </SelectItem>
                    <SelectItem value="Gerência de Educação para a Mobilidade">
                      Gerência de Educação para a Mobilidade
                    </SelectItem>
                    <SelectItem value="Gerência de Elaboração de Projetos Viários">
                      Gerência de Elaboração de Projetos Viários
                    </SelectItem>
                    <SelectItem value="Gerência de Estudos e Planejamento de Transportes">
                      Gerência de Estudos e Planejamento de Transportes
                    </SelectItem>
                    <SelectItem value="Gerência de Gestão de Operações de Transporte">
                      Gerência de Gestão de Operações de Transporte
                    </SelectItem>
                    <SelectItem value="Gerência de Implantação de Sinalização">
                      Gerência de Implantação de Sinalização
                    </SelectItem>
                    <SelectItem value="Gerência de Licenciamento de Projetos">
                      Gerência de Licenciamento de Projetos
                    </SelectItem>
                    <SelectItem value="Gerência de Licitações e Contratos">
                      Gerência de Licitações e Contratos
                    </SelectItem>
                    <SelectItem value="Gerência de Monitoramento Eletrônico">
                      Gerência de Monitoramento Eletrônico
                    </SelectItem>
                    <SelectItem value="Gerência de Operações de Trânsito">
                      Gerência de Operações de Trânsito
                    </SelectItem>
                    <SelectItem value="Gerência de Planejamento da Mobilidade">
                      Gerência de Planejamento da Mobilidade
                    </SelectItem>
                    <SelectItem value="Gerência de Planejamento Orçamentário">
                      Gerência de Planejamento Orçamentário
                    </SelectItem>
                    <SelectItem value="Gerência de Recursos Humanos">
                      Gerência de Recursos Humanos
                    </SelectItem>
                    <SelectItem value="Gerência de Tecnologia da Informação">
                      Gerência de Tecnologia da Informação
                    </SelectItem>
                    <SelectItem value="Gerência de Transportes Especiais">
                      Gerência de Transportes Especiais
                    </SelectItem>
                    <SelectItem value="Gerência do SIM">
                      Gerência do SIM
                    </SelectItem>
                    <SelectItem value="Gerência Orçamentária e Financeira">
                      Gerência Orçamentária e Financeira
                    </SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                    <SelectItem value="Participação Popular">
                      Participação Popular
                    </SelectItem>
                    <SelectItem value="Presidência">Presidência</SelectItem>
                    <SelectItem value="Vice Presidência">
                      Vice Presidência
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Responsavel"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full py-6 text-xl font-[600]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner />
              Cadastrando...
            </span>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
